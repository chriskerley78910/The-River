
# instantiates the Company database.
erl -mnesia dir '"/var/www/river/src/backend_erlang/db/files/Mnesia.Company"'
mnesia:create_schema([node()]).
mnesia:start().  # obviously starts the database.
mnesia:create_table(funky, Args).
# Args = [{attributes, record_info(fields, employee)}]

mnesia:info().


# examples

1> db:init().
{atomic,ok}
2> queries:insert_participant().
{atomic,ok}
3> queries:print_participant(104732).
{atomic,{participant,104732,"Chris","Kerley"}}
