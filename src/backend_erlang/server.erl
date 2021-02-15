-module(server).
-export([start/0]).

 % http://your.server.org/***/Module[:/]Function(?QueryString|/PathInfo)

 % example:
 %    http://your.server.org/***/Mod:Func(Arg1,...,ArgN)

 % concrete example:
 %    http://127.0.0.1:3000/api/app:subjects(args)


start() ->
    inets:start(),
    {ok, Pid} = inets:start(
          httpd,
          [
            {port, 3000},
            {server_name,"httpd_test"},
            {server_root,"/var/www/river"},
            {document_root,"/var/www/river/dist"},
            {modules,[
                mod_esi,
                mod_dir,
                mod_get  % enables getting files directly. e.g /index.html
            ]},
            {bind_address, "localhost"},
            {erl_script_alias, {"/api", [app]}}
          ]
    ),
    httpd:info(Pid).
