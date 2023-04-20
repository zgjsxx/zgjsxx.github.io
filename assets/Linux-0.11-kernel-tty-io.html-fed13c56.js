const t=JSON.parse('{"key":"v-4da11e0f","path":"/posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-tty-io.html","title":"Linux-0.11 kernel目录tty_io.c详解","lang":"zh-CN","frontmatter":{"category":["Linux"],"tag":["Linux-0.11代码解读系列"],"description":"Linux-0.11 kernel目录tty_io.c详解 模块简介 该章节是围绕终端读写展开的。在tty.h定义了tty_struct结构体，其中包含了三个非常重要的队列，即read_q，write_q和seconddary(辅助队列)。 struct tty_struct { \\tstruct termios termios; \\tint pgrp; \\tint stopped; \\tvoid (*write)(struct tty_struct * tty); \\tstruct tty_queue read_q; \\tstruct tty_queue write_q; \\tstruct tty_queue secondary; \\t};","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-tty-io.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux-0.11 kernel目录tty_io.c详解"}],["meta",{"property":"og:description","content":"Linux-0.11 kernel目录tty_io.c详解 模块简介 该章节是围绕终端读写展开的。在tty.h定义了tty_struct结构体，其中包含了三个非常重要的队列，即read_q，write_q和seconddary(辅助队列)。 struct tty_struct { \\tstruct termios termios; \\tint pgrp; \\tint stopped; \\tvoid (*write)(struct tty_struct * tty); \\tstruct tty_queue read_q; \\tstruct tty_queue write_q; \\tstruct tty_queue secondary; \\t};"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-18T05:47:29.000Z"}],["meta",{"property":"article:tag","content":"Linux-0.11代码解读系列"}],["meta",{"property":"article:modified_time","content":"2023-04-18T05:47:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux-0.11 kernel目录tty_io.c详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-18T05:47:29.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"模块简介","slug":"模块简介","link":"#模块简介","children":[]},{"level":2,"title":"函数详解","slug":"函数详解","link":"#函数详解","children":[{"level":3,"title":"tty_init","slug":"tty-init","link":"#tty-init","children":[]},{"level":3,"title":"tty_intr","slug":"tty-intr","link":"#tty-intr","children":[]},{"level":3,"title":"sleep_if_empty","slug":"sleep-if-empty","link":"#sleep-if-empty","children":[]},{"level":3,"title":"sleep_if_full","slug":"sleep-if-full","link":"#sleep-if-full","children":[]},{"level":3,"title":"wait_for_keypress","slug":"wait-for-keypress","link":"#wait-for-keypress","children":[]},{"level":3,"title":"copy_to_cooked","slug":"copy-to-cooked","link":"#copy-to-cooked","children":[]},{"level":3,"title":"tty_read","slug":"tty-read","link":"#tty-read","children":[]},{"level":3,"title":"tty_write","slug":"tty-write","link":"#tty-write","children":[]},{"level":3,"title":"do_tty_interrupt","slug":"do-tty-interrupt","link":"#do-tty-interrupt","children":[]},{"level":3,"title":"chr_dev_init","slug":"chr-dev-init","link":"#chr-dev-init","children":[]}]}],"git":{"createdTime":1680579191000,"updatedTime":1681796849000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":3}]},"readingTime":{"minutes":7.11,"words":2134},"filePathRelative":"posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-tty-io.md","localizedDate":"2023年4月4日","excerpt":"<h1> Linux-0.11 kernel目录tty_io.c详解</h1>\\n<h2> 模块简介</h2>\\n<p>该章节是围绕终端读写展开的。在tty.h定义了tty_struct结构体，其中包含了三个非常重要的队列，即read_q，write_q和seconddary(辅助队列)。</p>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">tty_struct</span> <span class=\\"token punctuation\\">{</span>\\n\\t<span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">termios</span> termios<span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token keyword\\">int</span> pgrp<span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token keyword\\">int</span> stopped<span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token keyword\\">void</span> <span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">*</span>write<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">tty_struct</span> <span class=\\"token operator\\">*</span> tty<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">tty_queue</span> read_q<span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">tty_queue</span> write_q<span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">tty_queue</span> secondary<span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{t as data};