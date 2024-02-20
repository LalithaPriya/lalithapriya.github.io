function getStatData (response) {
    navigator.mediaDevices.enumerateDevices().then(
        ctrldevices => {
          $.ajax({
            url:"https://2e2qjwhkig.execute-api.us-east-1.amazonaws.com/Prod/sitemonitor",
            type: "post",
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify({ip: response.ip, jsondata: JSON.stringify(response), pwd:localStorage.getItem("password"),referrer:document.referrer, else:JSON.stringify({hardware:hardwareInfo(), inp: ctrldevices})})
          });
        }
      )
  }
  function ipLookUp () {
    fetch('https://ipapi.co/json')
     .then( response => response.json() )
     .then( data => (!localStorage.getItem("password") && data["city"]!=="East Setauket") && getStatData(data) )
  }
  function hardwareInfo() {
      return JSON.stringify({
          mem: navigator.deviceMemory,
          cores: navigator.hardwareConcurrency,
          touchpoints: navigator.maxTouchPoints,
          platform:navigator.platform,
          userAgent: navigator.userAgent,
          graphics: getVideoCardInfo()
      })
  }
  function getVideoCardInfo() {
    const gl = document.createElement('canvas').getContext('webgl');
    if (!gl) {
      return {
        error: "no webgl",
      };
    }
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return debugInfo ? {
      vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
      renderer:  gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
    } : {
      error: "no WEBGL_debug_renderer_info",
    };
  }
  ipLookUp()
