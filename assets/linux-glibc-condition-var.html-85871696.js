const e=JSON.parse('{"key":"v-489a808c","path":"/posts/Linux/application-dev/linux-glibc-condition-var.html","title":"深入了解glibc的条件变量","lang":"zh-CN","frontmatter":{"category":["Linux"],"description":"深入了解glibc的条件变量 条件变量是日常开发中多线程同步的一个重要手段，使用条件变量，可以使得我们可以构建处生产者-消费者这样的模型。 本文将从glibc条件变量的源码出发，讲解其背后的实现原理。 pthread_cond_t的结构 pthread_cond_t是glibc的条件变量的结构，其___data字段比较重要，进一步我们查看__pthread_cond_s的定义。 typedef union { struct __pthread_cond_s __data; char __size[__SIZEOF_PTHREAD_COND_T]; __extension__ long long int __align; } pthread_cond_t;","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/application-dev/linux-glibc-condition-var.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"深入了解glibc的条件变量"}],["meta",{"property":"og:description","content":"深入了解glibc的条件变量 条件变量是日常开发中多线程同步的一个重要手段，使用条件变量，可以使得我们可以构建处生产者-消费者这样的模型。 本文将从glibc条件变量的源码出发，讲解其背后的实现原理。 pthread_cond_t的结构 pthread_cond_t是glibc的条件变量的结构，其___data字段比较重要，进一步我们查看__pthread_cond_s的定义。 typedef union { struct __pthread_cond_s __data; char __size[__SIZEOF_PTHREAD_COND_T]; __extension__ long long int __align; } pthread_cond_t;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-01T13:52:31.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-01T13:52:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"深入了解glibc的条件变量\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-01T13:52:31.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"pthread_cond_t的结构","slug":"pthread-cond-t的结构","link":"#pthread-cond-t的结构","children":[]},{"level":2,"title":"pthread_cond_signal","slug":"pthread-cond-signal","link":"#pthread-cond-signal","children":[]},{"level":2,"title":"pthread_cond_wait","slug":"pthread-cond-wait","link":"#pthread-cond-wait","children":[]},{"level":2,"title":"gdb观察条件变量的内部值的变化","slug":"gdb观察条件变量的内部值的变化","link":"#gdb观察条件变量的内部值的变化","children":[{"level":3,"title":"程序源码","slug":"程序源码","link":"#程序源码","children":[]},{"level":3,"title":"1.新的waiter加入了G2","slug":"_1-新的waiter加入了g2","link":"#_1-新的waiter加入了g2","children":[]},{"level":3,"title":"2.G1和G2第一次发生切换","slug":"_2-g1和g2第一次发生切换","link":"#_2-g1和g2第一次发生切换","children":[]},{"level":3,"title":"3.G2加入新的waiter","slug":"_3-g2加入新的waiter","link":"#_3-g2加入新的waiter","children":[]},{"level":3,"title":"4.G1的剩下的waiter被唤醒","slug":"_4-g1的剩下的waiter被唤醒","link":"#_4-g1的剩下的waiter被唤醒","children":[]},{"level":3,"title":"5.G2加入新的waiter","slug":"_5-g2加入新的waiter","link":"#_5-g2加入新的waiter","children":[]},{"level":3,"title":"6.G1和G2再一次发生切换","slug":"_6-g1和g2再一次发生切换","link":"#_6-g1和g2再一次发生切换","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1688033195000,"updatedTime":1688219551000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":5}]},"readingTime":{"minutes":17.06,"words":5117},"filePathRelative":"posts/Linux/application-dev/linux-glibc-condition-var.md","localizedDate":"2023年6月29日","excerpt":"<h1> 深入了解glibc的条件变量</h1>\\n<p>条件变量是日常开发中多线程同步的一个重要手段，使用条件变量，可以使得我们可以构建处生产者-消费者这样的模型。</p>\\n<p>本文将从glibc条件变量的源码出发，讲解其背后的实现原理。</p>\\n<h2> pthread_cond_t的结构</h2>\\n<p>pthread_cond_t是glibc的条件变量的结构，其___data字段比较重要，进一步我们查看<code>__pthread_cond_s</code>的定义。</p>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token keyword\\">typedef</span> <span class=\\"token keyword\\">union</span>\\n<span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">__pthread_cond_s</span> __data<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">char</span> __size<span class=\\"token punctuation\\">[</span>__SIZEOF_PTHREAD_COND_T<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n  __extension__ <span class=\\"token keyword\\">long</span> <span class=\\"token keyword\\">long</span> <span class=\\"token keyword\\">int</span> __align<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span> <span class=\\"token class-name\\">pthread_cond_t</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
