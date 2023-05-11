const n=JSON.parse('{"key":"v-f9ca62d8","path":"/posts/Program_language/cpp/effective-modern-cpp-39.html","title":"Item39: 对于一次性事件通信考虑使用void的futures","lang":"zh-CN","frontmatter":{"category":["C++","effective Modern C++"],"description":"Item39: 对于一次性事件通信考虑使用void的futures 通常我们需要在一个线程中通知另一个线程处理事务时，会使用条件变量去实现。本文提供了另外一种思路，即使用std::promise和std::future进行一次性的通讯。 分析 我们首先看看使用条件变量是如何实现的。 这里的案例是一个反应任务等待检测任务的过程。检测任务完毕，触发反应任务执行。 #include &lt;iostream&gt; #include &lt;string&gt; #include &lt;thread&gt; #include &lt;mutex&gt; #include &lt;condition_variable&gt; std::mutex mutex; std::condition_variable cv; bool ready = false; int main() { auto react_func = [](){ std::unique_lock&lt;std::mutex&gt; lock(mutex); std::cout &lt;&lt; \\"react wait to work\\" &lt;&lt; std::endl; cv.wait(lock, [] { return ready; }); std::this_thread::sleep_for(std::chrono::seconds(1)); std::cout &lt;&lt; \\"react work finish\\" &lt;&lt; std::endl; }; std::thread react(react_func); // 等待工作线程处理数据。 std::cout &lt;&lt; \\"detect start to run\\" &lt;&lt; std::endl; std::this_thread::sleep_for(std::chrono::seconds(1)); std::cout &lt;&lt; \\"detect work finish\\" &lt;&lt; std::endl; ready = true; cv.notify_one(); react.join(); return 0; }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-modern-cpp-39.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Item39: 对于一次性事件通信考虑使用void的futures"}],["meta",{"property":"og:description","content":"Item39: 对于一次性事件通信考虑使用void的futures 通常我们需要在一个线程中通知另一个线程处理事务时，会使用条件变量去实现。本文提供了另外一种思路，即使用std::promise和std::future进行一次性的通讯。 分析 我们首先看看使用条件变量是如何实现的。 这里的案例是一个反应任务等待检测任务的过程。检测任务完毕，触发反应任务执行。 #include &lt;iostream&gt; #include &lt;string&gt; #include &lt;thread&gt; #include &lt;mutex&gt; #include &lt;condition_variable&gt; std::mutex mutex; std::condition_variable cv; bool ready = false; int main() { auto react_func = [](){ std::unique_lock&lt;std::mutex&gt; lock(mutex); std::cout &lt;&lt; \\"react wait to work\\" &lt;&lt; std::endl; cv.wait(lock, [] { return ready; }); std::this_thread::sleep_for(std::chrono::seconds(1)); std::cout &lt;&lt; \\"react work finish\\" &lt;&lt; std::endl; }; std::thread react(react_func); // 等待工作线程处理数据。 std::cout &lt;&lt; \\"detect start to run\\" &lt;&lt; std::endl; std::this_thread::sleep_for(std::chrono::seconds(1)); std::cout &lt;&lt; \\"detect work finish\\" &lt;&lt; std::endl; ready = true; cv.notify_one(); react.join(); return 0; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-11T06:42:45.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-11T06:42:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Item39: 对于一次性事件通信考虑使用void的futures\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-11T06:42:45.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"分析","slug":"分析","link":"#分析","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1683787365000,"updatedTime":1683787365000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":2.3,"words":689},"filePathRelative":"posts/Program_language/cpp/effective-modern-cpp-39.md","localizedDate":"2023年5月11日","excerpt":"<h1> Item39: 对于一次性事件通信考虑使用void的futures</h1>\\n<p>通常我们需要在一个线程中<strong>通知</strong>另一个线程处理事务时，会使用条件变量去实现。本文提供了另外一种思路，即使用<code>std::promise</code>和<code>std::future</code>进行一次性的通讯。</p>\\n<h2> 分析</h2>\\n<p>我们首先看看使用条件变量是如何实现的。</p>\\n<p>这里的案例是一个反应任务等待检测任务的过程。检测任务完毕，触发反应任务执行。</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;iostream&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;string&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;thread&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;mutex&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;condition_variable&gt;</span></span>\\n\\nstd<span class=\\"token double-colon punctuation\\">::</span>mutex mutex<span class=\\"token punctuation\\">;</span>\\nstd<span class=\\"token double-colon punctuation\\">::</span>condition_variable cv<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">bool</span> ready <span class=\\"token operator\\">=</span> <span class=\\"token boolean\\">false</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  \\n    <span class=\\"token keyword\\">auto</span> react_func <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        std<span class=\\"token double-colon punctuation\\">::</span>unique_lock<span class=\\"token operator\\">&lt;</span>std<span class=\\"token double-colon punctuation\\">::</span>mutex<span class=\\"token operator\\">&gt;</span> <span class=\\"token function\\">lock</span><span class=\\"token punctuation\\">(</span>mutex<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"react wait to work\\"</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n        cv<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">wait</span><span class=\\"token punctuation\\">(</span>lock<span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token keyword\\">return</span> ready<span class=\\"token punctuation\\">;</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        std<span class=\\"token double-colon punctuation\\">::</span>this_thread<span class=\\"token double-colon punctuation\\">::</span><span class=\\"token function\\">sleep_for</span><span class=\\"token punctuation\\">(</span>std<span class=\\"token double-colon punctuation\\">::</span>chrono<span class=\\"token double-colon punctuation\\">::</span><span class=\\"token function\\">seconds</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"react work finish\\"</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>thread <span class=\\"token function\\">react</span><span class=\\"token punctuation\\">(</span>react_func<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// 等待工作线程处理数据。</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"detect start to run\\"</span> <span class=\\"token operator\\">&lt;&lt;</span>  std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>this_thread<span class=\\"token double-colon punctuation\\">::</span><span class=\\"token function\\">sleep_for</span><span class=\\"token punctuation\\">(</span>std<span class=\\"token double-colon punctuation\\">::</span>chrono<span class=\\"token double-colon punctuation\\">::</span><span class=\\"token function\\">seconds</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"detect work finish\\"</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n    ready <span class=\\"token operator\\">=</span> <span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">;</span>\\n    cv<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">notify_one</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    react<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">join</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
