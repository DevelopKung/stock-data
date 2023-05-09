export const state = () => ({
  lists: [{
      text: 'ช้อปปิ้ง',
      value: 'shopping',
      icon: 'fas fa-shopping-cart',
      color: 'bg-color-primary'
    },
    {
      text: 'รถ',
      value: 'car',
      icon: 'fas fa-car-side',
      color: 'bg-color-info'
    },
    {
      text: 'บ้าน',
      value: 'home',
      icon: 'fas fa-home',
      color: 'bg-color-warning'
    },
    {
      text: 'อาหาร',
      value: 'food',
      icon: 'fas fa-utensils',
      color: 'bg-color-error'
    },
    {
      text: 'ของขวัญ',
      value: 'gif',
      icon: 'fas fa-gift',
      color: 'bg-color-primary'
    },
    {
      text: 'อื่นๆ',
      value: 'etc',
      icon: 'fas fa-comment-dollar',
      color: 'bg-color-danger'
    },
  ]
})

export const getters = {
  lists: (state) => state.lists,
}