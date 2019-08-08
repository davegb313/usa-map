using an svg map from [here on wikipedia](https://upload.wikimedia.org/wikipedia/commons/1/1a/Blank_US_Map_%28states_only%29.svg)

we can quickly and easily build an SVG react USA state selection map!


### map agenda


- add `fill` prop to each state


## getting started


### mac

let's make sure we have installed `node` and `npm`

open the `terminal` application (command + space, terminal... or find it in Applications/Utilities)

`$ which node`

you should see a response like

`/usr/local/node`

if you see nothing, [download node from here](https://nodejs.org/en/download/)

once it's done downloading, you should see a response from

`$ which node`

`$ which npm`

and

`$ which npx`

once you do, you're ready to start!



### ubuntu


let's make sure we have installed `node` and `npm`


open bash (ctrl + alt + t)

`$ which node`

`$ which npm`

`$ which npx`

should all respond with a program location

if they don't, you'll need to install node

[if you're using version 18](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/)

[if you're using version 16](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)


once you have node, you're ready to go!




## making our project

open up the shell (git bash / terminal / ctrl + alt + t)

let's make a directory for all of our code projects

`$ mkdir code`

now we can check that it's really there

`$ ls`

and navigate into it

`$ cd code`


### create-react-app

now we can create a react app

`$ npx create-react-app usa-is-the-best`

once CRA is done running, we can enter the project and run it


`$ cd usa-is-the-best`

`$ npm start`

you should now see [localhost:3000](http://localhost:3000) with a rotating React logo.



## setting up the app

let's make ourselves a new Component, from which we'll render the map

`$ touch src/USA.js`

let's put the boilerplate React Component code

<sub>./src/USA.js</sub>
```js
import React from 'react';

const USA = ()=> (
  'USA Placeholder'
);

export default USA;
```

now we can set up our main file (App.js) how we want it


<sub>./src/App.js</sub>
```js
import React from 'react';
import './App.css';

import USA from './USA';

class App extends React.Component {
  render(){
    return (
      <div className='App'>
        <USA />
      </div>
    );
  }
};

export default App;
```

so we're ready to download our USA map SVG



## getting the map

our USA svg map is available [here on wikipedia](https://upload.wikimedia.org/wikipedia/commons/1/1a/Blank_US_Map_%28states_only%29.svg)

go into the browser and hit (ctrl + u / command + u / ctrl + u) to see the source code for the graphic


let's copy that into our USA component (so we can convert it to a React SVG)


<sub>./src/USA.js</sub>
```js
import React from 'react';

const USA = ()=> (
  <?xml version="1.0" encoding="UTF-8" standalone="no"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="959" height="593">
    <title>Blank US states map</title>
    <defs>
      <style type="text/css">


        .state {fill:#D3D3D3;}


        /*
        The .state class sets the default fill color for all states.

        Individual states (such as Kansas, Montana, Pennsylvania) can be colored as follows:

        #KS, #MT, #PA {fill:#0000FF;}

        Place this code in the empty space below.
        */





      </style>
    </defs>
    <g class="state">
      ...
    </g>
    <path id="frames" fill="none" stroke="#A9A9A9" stroke-width="2" d="M215 493v55l36 45M0 425h147l68 68h85l54 54v46"/>
  </svg>
);

export default USA;
```

we're going to need to do  bit of cleanup for this to work


- xml tags (delete)
- `<title>` and `<defs>` (delete)
- one comment near the end delete (delete)
- all kebab-case to camelCase
- edit id(s) on DC
- remove xmlns, convert the `height` and `width` on the `<svg>` tag to `viewBox`



#### removing the xml tag

you can see in the above code block the `<xml>` tag (the entire first line) which we want to remove


#### removing `<title>` and `<defs>`


you can see in the above code block the `<title>` and `<defs> ... </defs>` which we need to remove




#### remove the comment and unnecessary `<path/>` at the end, fixing `strokeWidth`

```html
//...

      <g id="DC">
        <title>District of Columbia</title>
        <path id="DC" d="M801.8 253.8l-1.1-1.6-1-.8 1.1-1.6 2.2 1.5z"/>
        <circle id="DC" stroke="#FFFFFF" strokeWidth="1.5" cx="801.3" cy="251.8" r="5" opacity="1"/>
      </g>
    </g>
  </svg>
);

export default USA;
```

you can see here we've changed the `id` on all the sections of the DC circle to 'DC' for later.

all other kebab-case attributes in the svg must be changed to camelCase



#### the viewBox

```html
  <svg viewBox="0 0 959 593">
```



---

now we should see the map show up on our screen, so we're ready to do some React programming!


## a state for our colors, a color for our states

in our `App`, we are going to keep track of which color each state should be.

how will we do that? using `state` of course!

let's give our App a `state`

<sub>./src/App.js</sub>
```js
import React from 'react';
import './App.css';

import USA from './USA';

class App extends React.Component {

  state = {
    AK: 'red'
  }
  
  render(){
    return (
      <div className='App'>
        <USA />
      </div>
    );
  }
};

export default App;
```

now we can pass our `state` to our map Component as a prop and make Alaska red


<sub>./src/App.js</sub>
```js
//...

  render(){
    return (
      <div className='App'>
        <USA colors={this.state}/>
      </div>
    );
  }
//...
```


inside the component, we'll need to read the `colors` prop and use it to set the `fill` on our state

<sub>./src/USA.js</sub>
```js
//...

const USA = ({ colors })=> (
  <svg viewBox="0 0 959 593">
    <g>
      <path id="AK" fill={colors.AK} ...
//...
```

now we can repeat this process 50 more times (50 state + DC!)



## changing the color

when our user clicks on a state, we want to update the `state` for that state

let's make an updater function and pass it to our map as a prop

<sub>./src/App.js</sub>
```js
import React from 'react';
import './App.css';

import USA from './USA';

class App extends React.Component {

  state = {
    AK: 'red'
  }

  changeStateColor = event => {
    this.setState({
      [event.target.id]: 'green',
    });
  }
  
  render(){
    return (
      <div className='App'>
        <USA colors={this.state} onClick={this.changeStateColor}/>
      </div>
    );
  }
};

export default App;
```

[those squre brackets inside the object literal... if they're foreign to you, check out these notes on Computed Property Names in JS](https://tylermcginnis.com/computed-property-names/)

at first, this is only going to change our states to green


now in our map Component, we can read that prop out and apply it to our svg

<sub>./src/USA.js</sub>
```js
//...

const USA = ({ colors, onClick })=> (
  <svg viewBox="0 0 959 593" onClick={onClick}>
    <g>

//...
```

[React has class Components and functional Components, check out this explanation of the difference](https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc)

[if the new function signature syntax, check out this article](https://davidwalsh.name/destructuring-function-arguments)


## doing it 51 times

once you've set up the fill on our 50 states + DC, we'll be ready to cycle through colors!


## cycling through colors

now that our states all update to the color we want, let's make them cycle through three colors

<sub>./src/App.js</sub>
```js
//...
const colors = ['red', 'blue', 'green'];

//...
      [event.target.id]: colors[ (colors.indexOf(this.state[event.target.id]) + 1) % colors.length ],

//...
```

let's get through this line and then we're done!


## calculating the totals for each color


first let's import the Electoral Votes numbers for each state

we'll want to make a new file for all this data

`$ touch src/votes.js`

and in it we can put

<sub>./src/votes.js</sub>
```js
export default {
  AL: 9,
  AK: 3,
  AZ: 11,
  AR: 6,
  CA: 55,
  CO: 9,
  CT: 7,
  DE: 3,
  FL: 29,
  GA: 16,
  HI: 4,
  ID: 4,
  IL: 20,
  IN: 11,
  IA: 6,
  KS: 6,
  KY: 8,
  LA: 8,
  ME: 4,
  MD: 10,
  MA: 11,
  MI: 16,
  MN: 10,
  MS: 6,
  MO: 10,
  MT: 3,
  NE: 5,
  NV: 6,
  NH: 4,
  NJ: 14,
  NM: 5,
  NY: 29,
  NC: 15,
  ND: 3,
  OH: 18,
  OK: 7,
  OR: 7,
  PA: 20,
  RI: 4,
  SC: 9,
  SD: 3,
  TN: 11,
  TX: 38,
  UT: 6,
  VT: 3,
  VA: 13,
  WA: 12,
  WV: 5,
  WI: 10,
  WY: 3,
  DC: 3,
};
```

and now we can import that to our App

<sub>./src/App.js</sub>
```js
//...

import votes from './votes';

//...
```


### triggering the calculation


<sub>./src/App.js</sub>
```js
  changeStateColor = event => {
    this.setState(
      {
        [event.target.id]: colors[
          (colors.indexOf(this.state[event.target.id]) + 1) % colors.length
        ],
      },
      this.calculateVotes,
    );
  };
```


### calculating the totals


we will now be calling our `calculateVotes` function every time a state changes

we want to loop over all the states and add up the new vote totals

<sub>./src/App.js</sub>
```js
  calculateVotes = () => {
    let totalReds = 0;
    let totalBlues = 0;
    let totalGreens = 0;

    Object.keys(votes).forEach(key => {
      if (this.state[key] === 'red') {
        totalReds += votes[key];
      } else if (this.state[key] === 'blue') {
        totalBlues += votes[key];
      } else if (this.state[key] === 'green') {
        totalGreens += votes[key];
      }
    });

    this.setState({
      reds: totalReds,
      blues: totalBlues,
      greens: totalGreens,
    });
  };

```


and render them into view


```html
        <div className="winner">
          <div><span />{this.state.reds}</div>
          <div><span />{this.state.blues}</div>
          <div><span />{this.state.greens}</div>
        </div>
```



<sub>./src/App.css</sub>
```css
.winner {
  display: flex;
  justify-content: center;
}

.winner span {
  display: inline-block;
  margin: 0 10px;
  height: 15px;
  width: 15px;
}

.winner > div:first-child span {
  background-color: red;
}

.winner > div:nth-child(2) span {
  background-color: blue;
}

.winner > div:last-child span {
  background-color: green;
}
```


great job team! now go and make great javascript again!


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

