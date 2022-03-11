const BASE_URL = "http://localhost:3000";

// add the API endpoint
const API_URL  = "http://localhost:8888/NetFlixClone/Roku_Flashback/api/index.php"

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
            @import "@/assets/sass/vars.scss";
            @import "@/assets/sass/reset.scss";
            @import "@/assets/sass/main.scss";
          `
      }
    }
  },

  devServer: {
    proxy: {
      '/users': {
        target: `${BASE_URL}`,
        changeOrigin: true,
        pathRewrite: { '^users': ''}
      },

      '/movies': {
        target: `${API_URL}`,
        changeOrigin: true,
        pathRewrite: { '^/movies': ''}
      }
    }
  }
};