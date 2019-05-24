<img src="https://github.com/techfort/redisvue/blob/master/src/renderer/assets/icon-redis.svg" width="128" />

# RedisVue

> real time Redis keys monitor

**RedisVue** is a light Redis realtime data viewer and pubsub messages viewer, which shows realtime updates of keys in Redis and allows inspection of each key's history. It also allows to run arbitrary commands and perform preview `SET` operations such as `UNION`, `DIFF` and `INTERSECT`, query ZSETs and run Lua scripts.

<img src="https://github.com/techfort/redisvue/blob/master/screenshot.png?raw=true" />

## Installation

I am working on producing distribution binaries, but for now:
Clone the repo, run `npm i` and...

* `npm start`
* or `npm run dev`
* or `npm run build` followed by the execution of the binary produced in the `build/` folder

## Status

I'm actively developing RedisVue and it's relatively stable however some parts are not as complete I'd like them to be. Feel free to report issues and submit PRs!

## Workflow

The app subscribes to keyspace notifications and receives events from the channel. Each message received specifies the event and triggers a key retrieval that is then added to RedisVue's history.

**IMPORTANT NOTE**: RedisVue can only receive events if the `notify-keyspace-events` parameter is set in `redis.conf` or if you turn it on by issuing `config set notify-keyspace-events KEA` from the redis cli. RedisVue issues this command to enable notifications, please make sure to turn it off after using RedisVue if you want these notifications disabled.

More info on keyspace notifications [here](https://redis.io/topics/notifications).

**NOTE**: Redis does have command that outputs the result of each command performed, namely `MONITOR`. However, the documentation clearly states that this can decrease throughput of [more than 50%](https://redis.io/commands/monitor), so the keyspace notification workflow seems like a more unobtrusive solution, even though each event triggers a retrieve operation (eg. a `set` event will trigger a `get` operation to retrieve the key value, a `sadd` will trigger a `smembers` etc.).

**ANOTHER NOTE**: redis streams (`XADD` etc.) are not supported yet, but coming very soon.

## Screens

Note, `Ctrl+tab` lets you scroll across the various screens, `Ctrl+shift+tab` to scroll in reverse.

### Connect

Specify the URL of the server and click connect. The status bar at the bottom will show a `connected` message with the URL of the server if the connection was successful. Default URL is `localhost:6379` for local redis installations.
You can also specify a database to listen to, default is `0` (redis has 0-15 databases, named with their number, you cannot "name" a database).
Lastly you can specify a pattern for the channel on which events are received. This is useful if you want to only watch keys that contain a certain string, eg. `myprefix_*`. Make sure to put asterisks on both sides of the pattern if the pattern can be contained at any position in the string (eg `*myprefix_*`).

### Watch

Here you can view the traffic of keys, each key is categorised by type. You can use the filter field to filter matching keys, and you can use the type field to filter matching types. The types are the standard Redis types `STRING`, `LIST`, `SET`, `ZSET` and `HASH`.
Each key name in the grid of incoming events is a link to the history screen, clicking the key name will bring you to its history page.

### History

This screen is only reachable by clicking one of the keys in the Watch screen. It shows the key's history with the value the key had at a particular timestamp.

### Query

Since RedisVue is real-time, it only show events occurred from after the launch of the application. You can use the query screen to query existing keys on the redis server and establish a baseline for the key history. Type a string and matching results will be shown. You can individually add keys as events into RedisVue, but you can also bulk `select all` and import the entire set of results. This query uses `SCAN` on the back end to comply to Redis best-practices.

### Run

In this screen you can run arbitrary commands or use the provided forms for `SET` `HSET` and `SADD` commands. Clicking the button to run the command will send the command to the redis server and the output of the command will be displayed below the button itself. Pressing `enter` on the last field of the form (or the `RUN` field) also triggers execution.

### Sets

Since RedisVue is particularly aimed at developers, it is useful to preview set operations before executing them to ensure the desired data is stored in the server. Select any two sets from the right-hand side and their `UNION`, `DIFF` and `INTERSECT` will be automatically displayed.
Any successive selection will replace the second set with the selected one. You can invert the selection of sets by clicking `INVERT SELECTION`.

### Zsets

In this screen you can perform remote queries on zsets and have the results displayed on screen. Make sure to be familiar with Redis commands since the error messages received from Redis may be a bit generic (eg. "wrong syntax"). This screen is Work In Progress.

### PubSub

In this screen you can subscribe to Redis channels, either by clicking on one of the "active" channels (active channels are the result of a `PUBSUB CHANNELS` command and are a list of channels with active subscribers), or subscribing to new channels. Each channel listed in the active channels has a text input in which you can type a message to be broadcast on that channel. Click on "unsubscribe" to unsubscribe to that channel.

### Lua

A small lua editor that lets you run scripts. I find it particularly useful for debugging Lua scripts by publishing log statements over a pubsub channel by doing `redis.call("PUBLISH", channel, test)` and subscribing to that same channel in the PubSub screen.
