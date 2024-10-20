function JwtDecode(token) {
    var base64url = token.split('.')[1]
    var base64 = decodeURIComponent(
      atob(base64url)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
    return JSON.parse(base64)
  }

export { JwtDecode };