import{_ as e,V as a,W as s,a0 as t}from"./framework-9a29aaa0.js";const n={},c=t(`<h1 id="item38-关注不同线程句柄的析构行为" tabindex="-1"><a class="header-anchor" href="#item38-关注不同线程句柄的析构行为" aria-hidden="true">#</a> Item38：关注不同线程句柄的析构行为</h1><p>本文主要focus线程的future句柄析构行的讨论上。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>future的析构行为是要分场景的。</p><p>如果future的创建同时满足了一下几个条件，它的析构过程会阻塞到任务执行完毕：</p><ul><li>它关联到由于调用std::async而创建出的共享状态。</li><li>任务的启动策略是std::launch::async（参见Item36），原因是运行时系统选择了该策略，或者在对std::async的调用中指定了该策略。</li><li>这个future是关联共享状态的最后一个future。对于std::future，情况总是如此，对于std::shared_future，如果还有其他的std::shared_future，与要被销毁的future引用相同的共享状态，则要被销毁的future遵循正常行为（即简单地销毁它的数据成员）。</li></ul><p>如果上述条件中任一条件不能满足，future的析构就是析构本身的数据成员， 不会有其他的附加行为。</p><p>试想为何如此设计？</p><p>如果使用<code>std::async</code>配合<code>std::launch::async</code>的策略， 那么<code>std::async</code>便和线程使用上大同小异了（除了资源调度以外）。</p><p>之前条款中提到过确保线程在任何路径最后都要是unjoinable的。这中场景下要如何保证？</p><p>似乎答案已经很明了了。<code>std::async</code>使用时并不创建对象， 只是会得到一个返回值<code>std::future</code>。所以unjoinable的任务只能交给<code>std::future</code>。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">auto</span> fut <span class="token operator">=</span> std<span class="token double-colon punctuation">::</span><span class="token function">async</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">//使用默认启动策略运行f</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>future的正常析构行为就是销毁future本身的数据成员。</li><li>引用了共享状态——使用std::async启动的未延迟任务建立的那个——的最后一个future的析构函数会阻塞住，直到任务完成。</li></ul>`,14),u=[c];function d(o,r){return a(),s("div",null,u)}const i=e(n,[["render",d],["__file","effective-modern-cpp-38.html.vue"]]);export{i as default};
