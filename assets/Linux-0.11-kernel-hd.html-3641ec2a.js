const e=JSON.parse('{"key":"v-ecf6a066","path":"/posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-hd.html","title":"Linux-0.11 kernel目录hd.c详解","lang":"zh-CN","frontmatter":{"category":["Linux"],"tag":["Linux-0.11代码解读系列"],"description":"Linux-0.11 kernel目录hd.c详解 在讲解hd.c的函数之前，需要先介绍一些宏定义，inb, inb_p, outb, outb_p。 inb宏的作用是去IO端口读取一个byte的数据。 在内嵌汇编中， :\\"d\\" (port))是输入，将port值写入了edx。 :\\"=a\\" (_v)是输出，即将AL的值写入_v中。 而汇编指令inb %%dx,%%al的作用是从端口dx中读取一个字节放入al中。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-hd.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux-0.11 kernel目录hd.c详解"}],["meta",{"property":"og:description","content":"Linux-0.11 kernel目录hd.c详解 在讲解hd.c的函数之前，需要先介绍一些宏定义，inb, inb_p, outb, outb_p。 inb宏的作用是去IO端口读取一个byte的数据。 在内嵌汇编中， :\\"d\\" (port))是输入，将port值写入了edx。 :\\"=a\\" (_v)是输出，即将AL的值写入_v中。 而汇编指令inb %%dx,%%al的作用是从端口dx中读取一个字节放入al中。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-04T03:33:11.000Z"}],["meta",{"property":"article:tag","content":"Linux-0.11代码解读系列"}],["meta",{"property":"article:modified_time","content":"2023-04-04T03:33:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux-0.11 kernel目录hd.c详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-04T03:33:11.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"sys_setup","slug":"sys-setup","link":"#sys-setup","children":[]},{"level":2,"title":"controller_ready","slug":"controller-ready","link":"#controller-ready","children":[]},{"level":2,"title":"win_result","slug":"win-result","link":"#win-result","children":[]},{"level":2,"title":"hd_out","slug":"hd-out","link":"#hd-out","children":[]},{"level":2,"title":"drive_busy","slug":"drive-busy","link":"#drive-busy","children":[]},{"level":2,"title":"reset_controller","slug":"reset-controller","link":"#reset-controller","children":[]},{"level":2,"title":"reset_hd","slug":"reset-hd","link":"#reset-hd","children":[]},{"level":2,"title":"unexpected_hd_interrupt","slug":"unexpected-hd-interrupt","link":"#unexpected-hd-interrupt","children":[]},{"level":2,"title":"bad_rw_intr","slug":"bad-rw-intr","link":"#bad-rw-intr","children":[]},{"level":2,"title":"read_intr","slug":"read-intr","link":"#read-intr","children":[]},{"level":2,"title":"write_intr","slug":"write-intr","link":"#write-intr","children":[]},{"level":2,"title":"recal_intr","slug":"recal-intr","link":"#recal-intr","children":[]},{"level":2,"title":"do_hd_request","slug":"do-hd-request","link":"#do-hd-request","children":[]},{"level":2,"title":"hd_init","slug":"hd-init","link":"#hd-init","children":[]}],"git":{"createdTime":1680579191000,"updatedTime":1680579191000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":10.34,"words":3102},"filePathRelative":"posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-hd.md","localizedDate":"2023年4月4日","excerpt":"<h1> Linux-0.11 kernel目录hd.c详解</h1>\\n<p>在讲解hd.c的函数之前，需要先介绍一些宏定义，inb, inb_p, outb, outb_p。</p>\\n<p><strong>inb</strong>宏的作用是去IO端口读取一个byte的数据。</p>\\n<p>在内嵌汇编中， <code>:\\"d\\" (port))</code>是输入，将port值写入了edx。 <code>:\\"=a\\" (_v)</code>是输出，即将AL的值写入_v中。</p>\\n<p>而汇编指令<code>inb %%dx,%%al</code>的作用是从端口dx中读取一个字节放入al中。</p>","autoDesc":true}');export{e as data};
