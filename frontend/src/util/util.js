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

  function timeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);
  
    const units = [
      { name: "year", seconds: 31536000 },
      { name: "month", seconds: 2592000 },
      { name: "day", seconds: 86400 },
      { name: "hour", seconds: 3600 },
      { name: "minute", seconds: 60 },
      { name: "second", seconds: 1 },
    ];
  
    for (const unit of units) {
      const quotient = Math.floor(diffInSeconds / unit.seconds);
      if (quotient > 0) {
        return `${quotient} ${unit.name}${quotient > 1 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  }

  function checkNotExpire(token) {
    const decodedToken = JwtDecode(token)
    const currentTime = Date.now() / 1000
    console.table(decodedToken.exp, currentTime);
    
    if (decodedToken.exp > currentTime) {
      return true
    }else{
      return false
    }
  }

export { JwtDecode , timeAgo, checkNotExpire};