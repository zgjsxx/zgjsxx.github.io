const e=JSON.parse('{"key":"v-0e01fb45","path":"/posts/Program_language/cpp/cpp11_condition_var.html","title":"c++11中的多线程同步 - 条件变量的唤醒丢失和虚假唤醒问题","lang":"zh-CN","frontmatter":{"description":"category: C++ c++11中的多线程同步 - 条件变量的唤醒丢失和虚假唤醒问题 什么是虚假唤醒？ 虚假唤醒既可能是操作系统层面导致的，也可能是应用层代码导致的。 内核层面导致的虚假唤醒 内核层面导致的虚假唤醒，当你调用signal_one方法时，操作系统不保证只唤醒一个线程。 这里参考Linux Man给出的原因。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/cpp11_condition_var.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"c++11中的多线程同步 - 条件变量的唤醒丢失和虚假唤醒问题"}],["meta",{"property":"og:description","content":"category: C++ c++11中的多线程同步 - 条件变量的唤醒丢失和虚假唤醒问题 什么是虚假唤醒？ 虚假唤醒既可能是操作系统层面导致的，也可能是应用层代码导致的。 内核层面导致的虚假唤醒 内核层面导致的虚假唤醒，当你调用signal_one方法时，操作系统不保证只唤醒一个线程。 这里参考Linux Man给出的原因。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T09:09:48.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-25T09:09:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"c++11中的多线程同步 - 条件变量的唤醒丢失和虚假唤醒问题\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T09:09:48.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"什么是虚假唤醒？","slug":"什么是虚假唤醒","link":"#什么是虚假唤醒","children":[]},{"level":2,"title":"如何避免虚假唤醒？","slug":"如何避免虚假唤醒","link":"#如何避免虚假唤醒","children":[]},{"level":2,"title":"什么是唤醒丢失","slug":"什么是唤醒丢失","link":"#什么是唤醒丢失","children":[]},{"level":2,"title":"如何避免唤醒丢失?","slug":"如何避免唤醒丢失","link":"#如何避免唤醒丢失","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1687684188000,"updatedTime":1687684188000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":5.14,"words":1542},"filePathRelative":"posts/Program_language/cpp/cpp11_condition_var.md","localizedDate":"2023年6月25日","excerpt":"<p>category:</p>\\n<ul>\\n<li>C++</li>\\n</ul>\\n<hr>\\n<h1> c++11中的多线程同步 - 条件变量的唤醒丢失和虚假唤醒问题</h1>\\n<h2> 什么是虚假唤醒？</h2>\\n<p>虚假唤醒既可能是操作系统层面导致的，也可能是应用层代码导致的。</p>\\n<p><strong>内核层面导致的虚假唤醒</strong></p>\\n<p>内核层面导致的虚假唤醒，当你调用signal_one方法时，操作系统不保证只唤醒一个线程。</p>\\n<p>这里参考<a href=\\"https://linux.die.net/man/3/pthread_cond_signal\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Linux Man</a>给出的原因。</p>","autoDesc":true}');export{e as data};
