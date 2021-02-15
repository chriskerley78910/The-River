-module(app).
-export([foo/3, subjects/3]).
foo(SessID, _Env, _Input) ->
  mod_esi:deliver(SessID, ["Data ", <<"as">>, " an iolist"]).

subjects(SessID, _Env, _Input) ->
  mod_esi:deliver(SessID, "Hello Chris!").
