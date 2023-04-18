const e=JSON.parse('{"key":"v-aa8f706a","path":"/posts/Linux/kernel/Linux-0.11/Linux-0.11-mm-memory.html","title":"Linux-0.11 memory.c详解","lang":"zh-CN","frontmatter":{"category":["Linux"],"tag":["Linux-0.11代码解读系列"],"description":"Linux-0.11 memory.c详解 模块简介 memory.c负责内存分页机制的管理。其中un_wp_page，copy_page_tables, do_no_page等函数较为重要。 在Linux-0.11中，内存区域划分如下图所示： memory-area","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/kernel/Linux-0.11/Linux-0.11-mm-memory.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux-0.11 memory.c详解"}],["meta",{"property":"og:description","content":"Linux-0.11 memory.c详解 模块简介 memory.c负责内存分页机制的管理。其中un_wp_page，copy_page_tables, do_no_page等函数较为重要。 在Linux-0.11中，内存区域划分如下图所示： memory-area"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-18T05:47:29.000Z"}],["meta",{"property":"article:tag","content":"Linux-0.11代码解读系列"}],["meta",{"property":"article:modified_time","content":"2023-04-18T05:47:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux-0.11 memory.c详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-18T05:47:29.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"模块简介","slug":"模块简介","link":"#模块简介","children":[]},{"level":2,"title":"函数详解","slug":"函数详解","link":"#函数详解","children":[{"level":3,"title":"get_free_page","slug":"get-free-page","link":"#get-free-page","children":[]},{"level":3,"title":"free_page","slug":"free-page","link":"#free-page","children":[]},{"level":3,"title":"free_page_tables","slug":"free-page-tables","link":"#free-page-tables","children":[]},{"level":3,"title":"copy_page_tables","slug":"copy-page-tables","link":"#copy-page-tables","children":[]},{"level":3,"title":"put_page","slug":"put-page","link":"#put-page","children":[]},{"level":3,"title":"un_wp_page","slug":"un-wp-page","link":"#un-wp-page","children":[]},{"level":3,"title":"do_wp_page","slug":"do-wp-page","link":"#do-wp-page","children":[]},{"level":3,"title":"write_verify","slug":"write-verify","link":"#write-verify","children":[]},{"level":3,"title":"get_empty_page","slug":"get-empty-page","link":"#get-empty-page","children":[]},{"level":3,"title":"try_to_share","slug":"try-to-share","link":"#try-to-share","children":[]},{"level":3,"title":"share_page","slug":"share-page","link":"#share-page","children":[]},{"level":3,"title":"do_no_page","slug":"do-no-page","link":"#do-no-page","children":[]},{"level":3,"title":"mem_init","slug":"mem-init","link":"#mem-init","children":[]},{"level":3,"title":"calc_mem","slug":"calc-mem","link":"#calc-mem","children":[]}]}],"git":{"createdTime":1680579191000,"updatedTime":1681796849000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":3}]},"readingTime":{"minutes":12,"words":3599},"filePathRelative":"posts/Linux/kernel/Linux-0.11/Linux-0.11-mm-memory.md","localizedDate":"2023年4月4日","excerpt":"<h1> Linux-0.11 memory.c详解</h1>\\n<h2> 模块简介</h2>\\n<p>memory.c负责内存分页机制的管理。其中un_wp_page，copy_page_tables, do_no_page等函数较为重要。</p>\\n<p>在Linux-0.11中，内存区域划分如下图所示：</p>\\n<figure><img src=\\"https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-memory/mem-area.png\\" alt=\\"memory-area\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>memory-area</figcaption></figure>","autoDesc":true}');export{e as data};
