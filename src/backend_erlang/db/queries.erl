-module(queries).
-export([insert_participant/0, print_participant/1]).
-include("record_defs.hrl").

print_participant(Id) ->
    F = fun() ->
                Table = participant,
                [E] = mnesia:read(Table, Id),
                E
        end,
    mnesia:transaction(F).

participant(P) ->
    WriteP = fun() ->
            mnesia:write(P)
    end,
    mnesia:transaction(WriteP).

insert_participant() ->
      P  = #participant{
              id = 104732,
              first_name = "Chris",
              last_name = "Kerley"
              },
      participant(P).
