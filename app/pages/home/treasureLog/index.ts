Page({
  data: {
    titleList:[
      {txtname:'全部'},
      {txtname:'翡翠'},
      {txtname:'玛瑙'},
      {txtname:'琥珀'},
      {txtname:'南红'},
      {txtname:'蜜蜡'},
      {txtname:'小明'},
      {txtname:'小东'},
      {txtname:'小西'},
      {txtname:'小北'},
      {txtname:'小南'},
      {txtname:'和田玉'}
    ],
    articleList:[
      {username:'小唐马'},
      {username:'小唐马'},
      {username:'小唐马'},
      {username:'小唐马'},
    ],
    index:0,
    selected:0,
  },
  onLoad() {
    console.log(111)
  }
  titleClick({currentTarget:{dataset}}){
    const {index} = dataset
    this.setData({
      selected:index
    })
  }
});
