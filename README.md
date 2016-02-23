# Persistent Presence

This Meteor package is based on tmeasday's presence package, except that now presences don't expire periodically, allowing you to keep track of presence continuously.

Useful for chat applications to track presence of users in a room.

## Installation

``` sh
$ meteor add hwrod:persistent-presence
```

## Usage

Once added to your project, a new Meteor collection called `Presences` is available.

All active connections are then stored in this collection. A presence document from an authenticated user will contain their user id on the `userId` field.

NOTE: The package doesn't publish the presences by default, you'll need to do something like:
```js
Meteor.publish('userPresence', function() {
  // Setup some filter to find the users your user
  // cares about. It's unlikely that you want to publish the 
  // presences of _all_ the users in the system.
  
  // If for example we wanted to publish only users in a particular room, we could apply:
  // filter = { 'state.room': { room }};
  var filter = {}; 
  
  return Presences.find(filter, { fields: { state: true, userId: true }});
});
```

And of course, don't forget to subscribe.

```js
Meteor.subscribe('userPresence');
```

## State function

If you want to track more than just users' online state, you can set a custom state function. (The default state function returns just `'online'`):

```js
// Setup the state function on the client
Presence.state = function () {
    return {
        room: Session.get('room'),
        user: Meteor.user()
    };
}
```

Now we can simply query the collection to find all other users that share the same room

```js
Presences.find({ state: { room: Session.get('room') }});
```

Of course Presence will call your function reactively, so everyone will know as soon as things change.

## Contributing

Feel free to submit pull requests!

## License

MIT
