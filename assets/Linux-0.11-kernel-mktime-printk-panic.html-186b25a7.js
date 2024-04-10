const e=JSON.parse('{"key":"v-2293763f","path":"/posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-mktime-printk-panic.html","title":"Linux-0.11 kernel目录mktime.c/printk.c/panic.c详解","lang":"zh-CN","frontmatter":{"category":["Linux"],"tag":["Linux-0.11代码解读系列"],"description":"Linux-0.11 kernel目录mktime.c/printk.c/panic.c详解 mktime.c模块简介 函数详解 kernel_mktime printk.c模块简介 函数详解 printk panic.c模块简介 函数详解 panic","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-mktime-printk-panic.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux-0.11 kernel目录mktime.c/printk.c/panic.c详解"}],["meta",{"property":"og:description","content":"Linux-0.11 kernel目录mktime.c/printk.c/panic.c详解 mktime.c模块简介 函数详解 kernel_mktime printk.c模块简介 函数详解 printk panic.c模块简介 函数详解 panic"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-10T13:47:16.000Z"}],["meta",{"property":"article:tag","content":"Linux-0.11代码解读系列"}],["meta",{"property":"article:modified_time","content":"2024-04-10T13:47:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux-0.11 kernel目录mktime.c/printk.c/panic.c详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-10T13:47:16.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"mktime.c模块简介","slug":"mktime-c模块简介","link":"#mktime-c模块简介","children":[]},{"level":2,"title":"函数详解","slug":"函数详解","link":"#函数详解","children":[{"level":3,"title":"kernel_mktime","slug":"kernel-mktime","link":"#kernel-mktime","children":[]}]},{"level":2,"title":"printk.c模块简介","slug":"printk-c模块简介","link":"#printk-c模块简介","children":[]},{"level":2,"title":"函数详解","slug":"函数详解-1","link":"#函数详解-1","children":[{"level":3,"title":"printk","slug":"printk","link":"#printk","children":[]}]},{"level":2,"title":"panic.c模块简介","slug":"panic-c模块简介","link":"#panic-c模块简介","children":[]},{"level":2,"title":"函数详解","slug":"函数详解-2","link":"#函数详解-2","children":[{"level":3,"title":"panic","slug":"panic","link":"#panic","children":[]}]}],"git":{"createdTime":1712756836000,"updatedTime":1712756836000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":3.13,"words":939},"filePathRelative":"posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-mktime-printk-panic.md","localizedDate":"2024年4月10日","excerpt":"<ul>\\n<li><a href=\\"#linux-011-kernel%E7%9B%AE%E5%BD%95mktimecprintkcpanicc%E8%AF%A6%E8%A7%A3\\">Linux-0.11 kernel目录mktime.c/printk.c/panic.c详解</a>\\n<ul>\\n<li><a href=\\"#mktimec%E6%A8%A1%E5%9D%97%E7%AE%80%E4%BB%8B\\">mktime.c模块简介</a></li>\\n<li><a href=\\"#%E5%87%BD%E6%95%B0%E8%AF%A6%E8%A7%A3\\">函数详解</a>\\n<ul>\\n<li><a href=\\"#kernel_mktime\\">kernel_mktime</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#printkc%E6%A8%A1%E5%9D%97%E7%AE%80%E4%BB%8B\\">printk.c模块简介</a></li>\\n<li><a href=\\"#%E5%87%BD%E6%95%B0%E8%AF%A6%E8%A7%A3-1\\">函数详解</a>\\n<ul>\\n<li><a href=\\"#printk\\">printk</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#panicc%E6%A8%A1%E5%9D%97%E7%AE%80%E4%BB%8B\\">panic.c模块简介</a></li>\\n<li><a href=\\"#%E5%87%BD%E6%95%B0%E8%AF%A6%E8%A7%A3-2\\">函数详解</a>\\n<ul>\\n<li><a href=\\"#panic\\">panic</a></li>\\n</ul>\\n</li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}');export{e as data};
