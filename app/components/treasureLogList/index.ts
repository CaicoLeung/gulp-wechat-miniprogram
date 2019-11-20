Component({
  properties: {
    _example: {
      type: String,
      value: ''
    }
  },
  methods: {
    _exampleFunc () {
      console.log('test')
    }
  },
  data: {
    auctionList:[
      {username:'小东'},
      {username:'小东'},
      {username:'小东'},
      {username:'小东'},
      {username:'小东'},
    ]
  }
})
