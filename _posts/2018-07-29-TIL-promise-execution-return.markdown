---
layout: post
title:  "TIL: Promises, reolution and then's second argument"
date:   2018-07-23 17:35:01 +0100
---
At work over the past weeks some situations arose that lead me to get a better understanding of promises.

## One: return reject();

In the first situation we had a peice of code that looked like so;

{% highlight javascript %}
return new Promise( ( resolve, reject ) => {
    if( rejectionCondition ) {
        reject();
    }

    doSomethingAsynchronous( data => {
        resolve( data );
    } );
} );
{% endhighlight %}

We were perplexed as to why when we reached our rejection condition the execution continued into our `doSomethingAsynchronous` function.

We realised that although our mental execution will stop at the rejection javascript will not! Here is what I learnt;

Promises in javascript can exist in one of three states

**Pending** The promise has not been resolved or rejected yet, the promise will start off in this state.

**Fulfilled** The promise `resolve` function has been called and the execution was a success.

**Rejected** The promise `reject` function was called and the execution was not a success.

Now when a **Fulfilled** or **Rejected** state is applied to a promise it cannot be changed, once a promise is rejected it is rejected forever and the same for being fulfilled.

here is an [example](https://jsfiddle.net/e64wzmb7/5/);

{% highlight javascript %}
const myPromise = new Promise( ( resolve, reject ) => {

    reject();
    console.log( 'still executing' );
    resolve();
} );

myPromise.then( () => {
	console.log( 'success' );
} ).catch( () => {
	console.log( 'failure' );
} );
{% endhighlight %}

now from this execution we get

```
> still executing
> failure
```

So the promise will finish executing its body unless you

`return reject();`


## Two: The Second Argument

Most of the code i have written for promises up until now has looked like so;

{% highlight javascript %}
const p = new Promise( ... );

p.then( () => {...} )
    .then( () => {...} )
    .then( () => {...} )
    .then( () => {...} )
    .catch( () => {...} );
{% endhighlight %}

the *problem* here is that the catch becomes a sink for any error that is thrown in any of the *then* calls above it.

this makes it a pain to identify at which stage an error actually occurred, until I found that `then` is actually `then( onFulfill, onReject )`

{% highlight javascript %}
p.then( () => {...}, handleStageOneError )
    .then( () => {...}, handleStageTwoError )
{% endhighlight %}
