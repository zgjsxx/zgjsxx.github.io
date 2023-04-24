const n=JSON.parse('{"key":"v-22b98e3f","path":"/posts/Program_language/cpp/cpp_realize_defer.html","title":"C++中如何实现go语言中的defer？","lang":"zh-CN","frontmatter":{"title":"C++中如何实现go语言中的defer？","category":["C++"],"description":"#include &lt;iostream&gt; #include &lt;functional&gt; #include &lt;mutex&gt; #define DEFER_LINENAME_CAT(name, line) name##line #define DEFER_LINENAME(name, line) DEFER_LINENAME_CAT(name, line) #define defer(deferFunction) RAIIDefer DEFER_LINENAME(DEFER_NAME_, __LINE__)(deferFunction) class RAIIDefer { public: \\tRAIIDefer(std::function&lt;void()&gt; fDeferFunction) { \\t\\tm_fDeferFunction = fDeferFunction; \\t} \\t~RAIIDefer() { \\t\\tif (m_fDeferFunction) \\t\\t{ \\t\\t\\tm_fDeferFunction(); \\t\\t} \\t} private: \\tRAIIDefer() {}; \\tstd::function&lt;void()&gt; m_fDeferFunction; }; int main() { std::cout &lt;&lt; \\"lock\\" &lt;&lt; std::endl; \\tstd::mutex mutex; \\tmutex.lock(); \\tdefer ( [&amp;] { std::cout &lt;&lt; \\"unlock\\" &lt;&lt; std::endl; \\t\\t\\tmutex.unlock(); \\t\\t} \\t); /* equals to RAIIDefer DEFER_NAME_36([&amp;] { std::cout &lt;&lt; \\"unlock\\" &lt;&lt; std::endl; mutex.unlock(); }) */ std::cout &lt;&lt; \\"doing something\\" &lt;&lt; std::endl; int res = -1; { if(res &lt; 0){ std::cout &lt;&lt; \\"will exit..\\" &lt;&lt;std::endl; } } }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/cpp_realize_defer.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"C++中如何实现go语言中的defer？"}],["meta",{"property":"og:description","content":"#include &lt;iostream&gt; #include &lt;functional&gt; #include &lt;mutex&gt; #define DEFER_LINENAME_CAT(name, line) name##line #define DEFER_LINENAME(name, line) DEFER_LINENAME_CAT(name, line) #define defer(deferFunction) RAIIDefer DEFER_LINENAME(DEFER_NAME_, __LINE__)(deferFunction) class RAIIDefer { public: \\tRAIIDefer(std::function&lt;void()&gt; fDeferFunction) { \\t\\tm_fDeferFunction = fDeferFunction; \\t} \\t~RAIIDefer() { \\t\\tif (m_fDeferFunction) \\t\\t{ \\t\\t\\tm_fDeferFunction(); \\t\\t} \\t} private: \\tRAIIDefer() {}; \\tstd::function&lt;void()&gt; m_fDeferFunction; }; int main() { std::cout &lt;&lt; \\"lock\\" &lt;&lt; std::endl; \\tstd::mutex mutex; \\tmutex.lock(); \\tdefer ( [&amp;] { std::cout &lt;&lt; \\"unlock\\" &lt;&lt; std::endl; \\t\\t\\tmutex.unlock(); \\t\\t} \\t); /* equals to RAIIDefer DEFER_NAME_36([&amp;] { std::cout &lt;&lt; \\"unlock\\" &lt;&lt; std::endl; mutex.unlock(); }) */ std::cout &lt;&lt; \\"doing something\\" &lt;&lt; std::endl; int res = -1; { if(res &lt; 0){ std::cout &lt;&lt; \\"will exit..\\" &lt;&lt;std::endl; } } }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-24T15:45:50.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-24T15:45:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"C++中如何实现go语言中的defer？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-24T15:45:50.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1682351150000,"updatedTime":1682351150000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.36,"words":109},"filePathRelative":"posts/Program_language/cpp/cpp_realize_defer.md","localizedDate":"2023年4月24日","excerpt":"<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;iostream&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;functional&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;mutex&gt;</span></span>\\n\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">define</span> <span class=\\"token macro-name function\\">DEFER_LINENAME_CAT</span><span class=\\"token expression\\"><span class=\\"token punctuation\\">(</span>name<span class=\\"token punctuation\\">,</span> line<span class=\\"token punctuation\\">)</span> name</span><span class=\\"token punctuation\\">##</span><span class=\\"token expression\\">line</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">define</span> <span class=\\"token macro-name function\\">DEFER_LINENAME</span><span class=\\"token expression\\"><span class=\\"token punctuation\\">(</span>name<span class=\\"token punctuation\\">,</span> line<span class=\\"token punctuation\\">)</span> <span class=\\"token function\\">DEFER_LINENAME_CAT</span><span class=\\"token punctuation\\">(</span>name<span class=\\"token punctuation\\">,</span> line<span class=\\"token punctuation\\">)</span></span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">define</span> <span class=\\"token macro-name function\\">defer</span><span class=\\"token expression\\"><span class=\\"token punctuation\\">(</span>deferFunction<span class=\\"token punctuation\\">)</span> RAIIDefer <span class=\\"token function\\">DEFER_LINENAME</span><span class=\\"token punctuation\\">(</span>DEFER_NAME_<span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">__LINE__</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">(</span>deferFunction<span class=\\"token punctuation\\">)</span></span></span>\\n\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">RAIIDefer</span>\\n<span class=\\"token punctuation\\">{</span>\\n<span class=\\"token keyword\\">public</span><span class=\\"token operator\\">:</span>\\n\\t<span class=\\"token function\\">RAIIDefer</span><span class=\\"token punctuation\\">(</span>std<span class=\\"token double-colon punctuation\\">::</span>function<span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">&gt;</span> fDeferFunction<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n\\t\\tm_fDeferFunction <span class=\\"token operator\\">=</span> fDeferFunction<span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token punctuation\\">}</span> \\n\\t<span class=\\"token operator\\">~</span><span class=\\"token function\\">RAIIDefer</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n\\t\\t<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>m_fDeferFunction<span class=\\"token punctuation\\">)</span>\\n\\t\\t<span class=\\"token punctuation\\">{</span>\\n\\t\\t\\t<span class=\\"token function\\">m_fDeferFunction</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t\\t<span class=\\"token punctuation\\">}</span>\\n\\t<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">private</span><span class=\\"token operator\\">:</span>\\n\\t<span class=\\"token function\\">RAIIDefer</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\tstd<span class=\\"token double-colon punctuation\\">::</span>function<span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">&gt;</span> m_fDeferFunction<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>   \\n    std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"lock\\"</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n\\tstd<span class=\\"token double-colon punctuation\\">::</span>mutex mutex<span class=\\"token punctuation\\">;</span>\\n\\tmutex<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">lock</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">defer</span> <span class=\\"token punctuation\\">(</span> <span class=\\"token punctuation\\">[</span><span class=\\"token operator\\">&amp;</span><span class=\\"token punctuation\\">]</span> <span class=\\"token punctuation\\">{</span>\\n            std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"unlock\\"</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n\\t\\t\\tmutex<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">unlock</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t\\t<span class=\\"token punctuation\\">}</span>\\n\\t<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>  \\n    <span class=\\"token comment\\">/*\\n        equals to \\n        RAIIDefer DEFER_NAME_36([&amp;] { std::cout &lt;&lt; \\"unlock\\" &lt;&lt; std::endl; mutex.unlock(); })\\n    */</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"doing something\\"</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">int</span> res <span class=\\"token operator\\">=</span> <span class=\\"token operator\\">-</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">if</span><span class=\\"token punctuation\\">(</span>res <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n            std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"will exit..\\"</span> <span class=\\"token operator\\">&lt;&lt;</span>std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>    \\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>    \\n<span class=\\"token punctuation\\">}</span>\\n\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
