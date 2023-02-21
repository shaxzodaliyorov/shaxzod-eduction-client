export const GetItem = (key) => {
   try {
      return localStorage.getItem(key)
   } catch (error) {
      console.log(error)
   }
}

export const SetItem = (key, value) => {
   try {
      localStorage.setItem(key, value)
   } catch (error) {
      console.log(error)
   }
}

export const RemoveItem = (key) => {
   try {
      localStorage.removeItem(key)
   } catch (error) {
      console.log(error)
   }
}