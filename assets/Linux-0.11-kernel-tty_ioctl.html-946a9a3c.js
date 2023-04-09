const e=JSON.parse('{"key":"v-5f435f4c","path":"/posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-tty_ioctl.html","title":"Linux-0.11 kernel目录tty_ioctl.c详解","lang":"zh-CN","frontmatter":{"category":["Linux"],"tag":["Linux-0.11代码解读系列"],"description":"Linux-0.11 kernel目录tty_ioctl.c详解 模块简介 函数详解 change_speed static void change_speed(struct tty_struct * tty)","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-tty_ioctl.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux-0.11 kernel目录tty_ioctl.c详解"}],["meta",{"property":"og:description","content":"Linux-0.11 kernel目录tty_ioctl.c详解 模块简介 函数详解 change_speed static void change_speed(struct tty_struct * tty)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-07T13:07:27.000Z"}],["meta",{"property":"article:tag","content":"Linux-0.11代码解读系列"}],["meta",{"property":"article:modified_time","content":"2023-04-07T13:07:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux-0.11 kernel目录tty_ioctl.c详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-07T13:07:27.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"模块简介","slug":"模块简介","link":"#模块简介","children":[]},{"level":2,"title":"函数详解","slug":"函数详解","link":"#函数详解","children":[{"level":3,"title":"change_speed","slug":"change-speed","link":"#change-speed","children":[]},{"level":3,"title":"flush","slug":"flush","link":"#flush","children":[]},{"level":3,"title":"wait_until_sent","slug":"wait-until-sent","link":"#wait-until-sent","children":[]},{"level":3,"title":"send_break","slug":"send-break","link":"#send-break","children":[]},{"level":3,"title":"get_termios","slug":"get-termios","link":"#get-termios","children":[]},{"level":3,"title":"set_termios","slug":"set-termios","link":"#set-termios","children":[]},{"level":3,"title":"get_termio","slug":"get-termio","link":"#get-termio","children":[]},{"level":3,"title":"set_termio","slug":"set-termio","link":"#set-termio","children":[]},{"level":3,"title":"tty_ioctl","slug":"tty-ioctl","link":"#tty-ioctl","children":[]}]},{"level":2,"title":"Q & A","slug":"q-a","link":"#q-a","children":[]}],"git":{"createdTime":1680702865000,"updatedTime":1680872847000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":2}]},"readingTime":{"minutes":2.24,"words":673},"filePathRelative":"posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-tty_ioctl.md","localizedDate":"2023年4月5日","excerpt":"<h1> Linux-0.11 kernel目录tty_ioctl.c详解</h1>\\n<h2> 模块简介</h2>\\n<h2> 函数详解</h2>\\n<h3> change_speed</h3>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">change_speed</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">tty_struct</span> <span class=\\"token operator\\">*</span> tty<span class=\\"token punctuation\\">)</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};