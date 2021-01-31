import Supervisor from './../../src/backend/supervisor'


describe('Supervisor', ()=>{

  let sut
  let server = {}

  const setup = () =>{
    const fork = jest.fn(() => server)
    sut = new Supervisor(fork)
  }
  beforeEach(setup)

  it('setupfork(no args) create a real fork', ()=>{
    expect(typeof sut.fork).toBe('function')
  })

  it('startServerProcess() forks a child process of the backend server', ()=>{
    sut.initializeCallbacks = jest.fn()
    sut.executePollingCycle = jest.fn()

    sut.startServerProcess()

    expect(sut.getServer()).toBe(server)
    expect(sut.initializeCallbacks).toHaveBeenCalled()
    expect(sut.executePollingCycle).toHaveBeenCalled()
  })

  it('checkHeartBeat(), isHeartBeatThere => executePollingCycle', ()=>{
    sut.isHeartBeatThere = () => true
    sut.executePollingCycle = jest.fn()
    sut.checkHeartBeat()
    expect(sut.executePollingCycle).toHaveBeenCalled()
  })

  it('checkHeartBeat(), !isHeartBeatThere => killServer', ()=>{
    sut.isHeartBeatThere = () => false
    sut.executePollingCycle = jest.fn()
    sut.killServer = jest.fn()

    sut.checkHeartBeat()

    expect(sut.executePollingCycle).not.toHaveBeenCalled()
    expect(sut.killServer).toHaveBeenCalled()
  })

  it('setHeartBeat() sets heartbeat == null if message.heartbeat is missing',()=>{
    sut.setHeartBeat({})
    expect(sut.isHeartBeatThere()).toBeFalsy()
  })


})
