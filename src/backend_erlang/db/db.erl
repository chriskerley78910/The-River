-module(db).
-include_lib("stdlib/include/qlc.hrl").
-include("record_defs.hrl").
-export([init/0]).

init() ->
  mnesia:start(),
  mnesia:create_table(participant,
                        [{attributes, record_info(fields, participant)}]).
