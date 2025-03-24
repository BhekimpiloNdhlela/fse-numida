import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=7171a851"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import "/src/index.css";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=7171a851"; const StrictMode = __vite__cjsImport3_react["StrictMode"];
import __vite__cjsImport4_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=7171a851"; const createRoot = __vite__cjsImport4_reactDom_client["createRoot"];
import { ApolloClient, InMemoryCache, ApolloProvider } from "/node_modules/.vite/deps/@apollo_client.js?v=7171a851";
import App from "/src/App.tsx?t=1742738192956";
const client = new ApolloClient({
  uri: "http://localhost:2024/graphql",
  cache: new InMemoryCache()
});
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxDEV(StrictMode, { children: /* @__PURE__ */ jsxDEV(ApolloProvider, { client, children: /* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
    fileName: "/Users/bhekindhlela/Desktop/fse-numida/full-stack/web/src/main.tsx",
    lineNumber: 18,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/Users/bhekindhlela/Desktop/fse-numida/full-stack/web/src/main.tsx",
    lineNumber: 17,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "/Users/bhekindhlela/Desktop/fse-numida/full-stack/web/src/main.tsx",
    lineNumber: 16,
    columnNumber: 3
  }, this)
);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBaUJNO0FBakJOLE9BQU87QUFDUCxPQUFPO0FBRVAsU0FBU0Esa0JBQWtCO0FBQzNCLFNBQVNDLGtCQUFrQjtBQUMzQixTQUFTQyxjQUFjQyxlQUFlQyxzQkFBc0I7QUFFNUQsT0FBT0MsU0FBUztBQUVoQixNQUFNQyxTQUFTLElBQUlKLGFBQWE7QUFBQSxFQUM5QkssS0FBSztBQUFBLEVBQ0xDLE9BQU8sSUFBSUwsY0FBYztBQUMzQixDQUFDO0FBRURGLFdBQVdRLFNBQVNDLGVBQWUsTUFBTSxDQUFFLEVBQUVDO0FBQUFBLEVBQzNDLHVCQUFDLGNBQ0MsaUNBQUMsa0JBQWUsUUFDZCxpQ0FBQyxTQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBSSxLQUROO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FFQSxLQUhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FJQTtBQUNGIiwibmFtZXMiOlsiU3RyaWN0TW9kZSIsImNyZWF0ZVJvb3QiLCJBcG9sbG9DbGllbnQiLCJJbk1lbW9yeUNhY2hlIiwiQXBvbGxvUHJvdmlkZXIiLCJBcHAiLCJjbGllbnQiLCJ1cmkiLCJjYWNoZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW5kZXIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsibWFpbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiLi9pbmRleC5jc3NcIjtcbmltcG9ydCBcImJvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAubWluLmNzc1wiO1xuXG5pbXBvcnQgeyBTdHJpY3RNb2RlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVSb290IH0gZnJvbSBcInJlYWN0LWRvbS9jbGllbnRcIjtcbmltcG9ydCB7IEFwb2xsb0NsaWVudCwgSW5NZW1vcnlDYWNoZSwgQXBvbGxvUHJvdmlkZXIgfSBmcm9tIFwiQGFwb2xsby9jbGllbnRcIjtcblxuaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudHN4XCI7XG5cbmNvbnN0IGNsaWVudCA9IG5ldyBBcG9sbG9DbGllbnQoe1xuICB1cmk6IFwiaHR0cDovL2xvY2FsaG9zdDoyMDI0L2dyYXBocWxcIixcbiAgY2FjaGU6IG5ldyBJbk1lbW9yeUNhY2hlKCksXG59KTtcblxuY3JlYXRlUm9vdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikhKS5yZW5kZXIoXG4gIDxTdHJpY3RNb2RlPlxuICAgIDxBcG9sbG9Qcm92aWRlciBjbGllbnQ9e2NsaWVudH0+XG4gICAgICA8QXBwIC8+XG4gICAgPC9BcG9sbG9Qcm92aWRlcj5cbiAgPC9TdHJpY3RNb2RlPlxuKTtcbiJdLCJmaWxlIjoiL1VzZXJzL2JoZWtpbmRobGVsYS9EZXNrdG9wL2ZzZS1udW1pZGEvZnVsbC1zdGFjay93ZWIvc3JjL21haW4udHN4In0=