# RedisVue

<img src="https://github.com/techfort/redisvue/blob/master/src/renderer/assets/icon-redis.svg" width="256" />

> redis real time monitor

**RedisVue** is a light Redis realtime data viewer, which shows realtime updates of keys in Redis and allows inspection of  each key's history. It also allows to run arbitrary commands and perform preview `SET` operations such as `UNION`, `DIFF` and `INTERSECT`.

<img src="https://github.com/techfort/redisvue/blob/master/screenshot.png?raw=true" />

## Workflow

The app subscribes to keyspace notifications and receives events from the channel. Each message received specifies 


## Screens

### Connect

Specify the URL of the server and click connect. The status bar at the bottom will show a `connected` message with the URL of the server if the connection was successful. Default URL is `localhost:6379` for local redis installations.  
You can also specify a database to listen to, default is `0` (redis has 0-15 databases, named with their number, you cannot "name" a database).
Lastly you can specify a pattern for the channel on which events are received. This is useful if you want to only watch keys that contain a certain string, eg. `tw_mc_*`. Make sure to put asterisks on both sides of the pattern if the pattern can be contained at any position in the string (eg `*tw_mc_*).

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
