-module(app).
-export([participants/3]).


participants(SessID, _Env, _Input) ->
  Erl = {struct,[{"Name","Tom"},{"Age",10}]},
  EncodedJson = mochijson:encode(Erl),
  mod_esi:deliver(SessID, EncodedJson).
