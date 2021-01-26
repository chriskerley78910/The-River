const serverPath = __dirname + '/server'
const HEART_BEAT_INTERVAL = 5000

class Supervisor {

  constructor(fork){
    this.setupfork(fork)
    this.bindFunctions()
    this.server = null
    this.heartbeat = null
  }

  bindFunctions(){
    this.startServerProcess = this.startServerProcess.bind(this)
    this.setProcessMessageCallback = this.setProcessMessageCallback.bind(this)
    this.setProcessCloseCallback = this.setProcessCloseCallback.bind(this)
    this.restartServerProcess = this.restartServerProcess.bind(this)
    this.checkHeartBeat = this.checkHeartBeat.bind(this)
    this.setHeartBeat = this.setHeartBeat.bind(this)
    this.isHeartBeatThere = this.isHeartBeatThere.bind(this)
  }

  setupfork(fork){
    if(fork)
      this.fork = fork
    else
      this.fork = require('child_process').fork;
  }

  startServerProcess(){
    this.server = this.fork(serverPath)
    this.initializeCallbacks()
    this.executePollingCycle()
  }

  initializeCallbacks(){
    this.setProcessCloseCallback()
    this.setProcessMessageCallback()
  }

  setProcessCloseCallback(){
      this.server.on('close',this.restartServerProcess);
  }

  setProcessMessageCallback(){
      this.server.on('message',this.setHeartBeat);
  }

  checkHeartBeat(){
    if(this.isHeartBeatThere())
       this.executePollingCycle()
    else
       this.killServer()
  }

  isHeartBeatThere(){
    return this.heartbeat != null
  }

  executePollingCycle(){
    this.clearHeartBeat()
    this.setTimer()
    this.requestHeartBeat()
  }

  clearHeartBeat(){
    this.heartbeat = null;
  }

  setTimer(){
    setTimeout(this.checkHeartBeat, HEART_BEAT_INTERVAL);
  }

  requestHeartBeat(){
    this.server.send({request: 'heartbeat'});
  }

  setHeartBeat(message){
     this.heartbeat = message ? message.heartbeat : null;
  }

  restartServerProcess(code){
      this.startServerProcess();
  }

  getServer(){
    return this.server
  }

  killServer(){
    console.log('Server not responding.  Killing server.')
    this.server.kill();
  }
}
module.exports = Supervisor
