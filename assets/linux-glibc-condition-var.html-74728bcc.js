const e=JSON.parse('{"key":"v-489a808c","path":"/posts/Linux/application-dev/linux-glibc-condition-var.html","title":"深入了解glibc的条件变量","lang":"zh-CN","frontmatter":{"category":["Linux"],"description":"深入了解glibc的条件变量 条件变量是日常开发中进行多线程同步的一个重要手段，使用条件变量，可以使得我们可以构建出生产者-消费者这样的模型。 本文将从glibc条件变量的源码出发，讲解其背后的实现原理。 pthread_cond_t的结构 pthread_cond_t是glibc的条件变量的结构，其___data字段比较重要，进一步我们查看__pthread_cond_s的定义。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/application-dev/linux-glibc-condition-var.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"深入了解glibc的条件变量"}],["meta",{"property":"og:description","content":"深入了解glibc的条件变量 条件变量是日常开发中进行多线程同步的一个重要手段，使用条件变量，可以使得我们可以构建出生产者-消费者这样的模型。 本文将从glibc条件变量的源码出发，讲解其背后的实现原理。 pthread_cond_t的结构 pthread_cond_t是glibc的条件变量的结构，其___data字段比较重要，进一步我们查看__pthread_cond_s的定义。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-01T14:57:09.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-01T14:57:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"深入了解glibc的条件变量\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-01T14:57:09.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"pthread_cond_t的结构","slug":"pthread-cond-t的结构","link":"#pthread-cond-t的结构","children":[]},{"level":2,"title":"pthread_cond_signal方法","slug":"pthread-cond-signal方法","link":"#pthread-cond-signal方法","children":[]},{"level":2,"title":"pthread_cond_wait方法","slug":"pthread-cond-wait方法","link":"#pthread-cond-wait方法","children":[]},{"level":2,"title":"pthread_cond_signal和pthread_cond_wait梳理","slug":"pthread-cond-signal和pthread-cond-wait梳理","link":"#pthread-cond-signal和pthread-cond-wait梳理","children":[]},{"level":2,"title":"条件变量的虚假唤醒是如何产生的?","slug":"条件变量的虚假唤醒是如何产生的","link":"#条件变量的虚假唤醒是如何产生的","children":[]},{"level":2,"title":"gdb观察条件变量的内部值的变化","slug":"gdb观察条件变量的内部值的变化","link":"#gdb观察条件变量的内部值的变化","children":[{"level":3,"title":"程序源码","slug":"程序源码","link":"#程序源码","children":[]},{"level":3,"title":"1.新的waiter加入了G2","slug":"_1-新的waiter加入了g2","link":"#_1-新的waiter加入了g2","children":[]},{"level":3,"title":"2.G1和G2第一次发生切换","slug":"_2-g1和g2第一次发生切换","link":"#_2-g1和g2第一次发生切换","children":[]},{"level":3,"title":"3.G2加入新的waiter","slug":"_3-g2加入新的waiter","link":"#_3-g2加入新的waiter","children":[]},{"level":3,"title":"4.G1的剩下的waiter被唤醒","slug":"_4-g1的剩下的waiter被唤醒","link":"#_4-g1的剩下的waiter被唤醒","children":[]},{"level":3,"title":"5.G2加入新的waiter","slug":"_5-g2加入新的waiter","link":"#_5-g2加入新的waiter","children":[]},{"level":3,"title":"6.G1和G2再一次发生切换","slug":"_6-g1和g2再一次发生切换","link":"#_6-g1和g2再一次发生切换","children":[]}]},{"level":2,"title":"附录","slug":"附录","link":"#附录","children":[{"level":3,"title":"pthread_cond_s各字段含义","slug":"pthread-cond-s各字段含义","link":"#pthread-cond-s各字段含义","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1688033195000,"updatedTime":1688223429000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":9}]},"readingTime":{"minutes":19.79,"words":5937},"filePathRelative":"posts/Linux/application-dev/linux-glibc-condition-var.md","localizedDate":"2023年6月29日","excerpt":"<h1> 深入了解glibc的条件变量</h1>\\n<p><strong>条件变量</strong>是日常开发中进行<strong>多线程同步</strong>的一个重要手段，使用条件变量，可以使得我们可以构建出<strong>生产者-消费者</strong>这样的模型。</p>\\n<p>本文将从glibc条件变量的源码出发，讲解其背后的实现原理。</p>\\n<h2> pthread_cond_t的结构</h2>\\n<p><code>pthread_cond_t</code>是glibc的条件变量的结构，其<code>___data</code>字段比较重要，进一步我们查看<code>__pthread_cond_s</code>的定义。</p>","autoDesc":true}');export{e as data};
