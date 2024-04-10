const e=JSON.parse('{"key":"v-4354b7dc","path":"/posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-sched.html","title":"Linux-0.11 kernel目录进程管理sched.c详解","lang":"zh-CN","frontmatter":{"category":["Linux"],"tag":["Linux-0.11代码解读系列"],"description":"Linux-0.11 kernel目录进程管理sched.c详解 模块简介 函数详解 schedule show_task show_stat math_state_restore sys_pause sleep_on interruptible_sleep_on wake_up ticks_to_floppy_on floppy_on floppy_off do_floppy_timer add_timer do_timer sys_alarm sys_getpid sys_getppid sys_getuid sys_geteuid sys_getgid sys_getegid sys_nice sched_init","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-sched.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux-0.11 kernel目录进程管理sched.c详解"}],["meta",{"property":"og:description","content":"Linux-0.11 kernel目录进程管理sched.c详解 模块简介 函数详解 schedule show_task show_stat math_state_restore sys_pause sleep_on interruptible_sleep_on wake_up ticks_to_floppy_on floppy_on floppy_off do_floppy_timer add_timer do_timer sys_alarm sys_getpid sys_getppid sys_getuid sys_geteuid sys_getgid sys_getegid sys_nice sched_init"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-10T12:57:45.000Z"}],["meta",{"property":"article:tag","content":"Linux-0.11代码解读系列"}],["meta",{"property":"article:modified_time","content":"2024-04-10T12:57:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux-0.11 kernel目录进程管理sched.c详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-10T12:57:45.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"模块简介","slug":"模块简介","link":"#模块简介","children":[]},{"level":2,"title":"函数详解","slug":"函数详解","link":"#函数详解","children":[{"level":3,"title":"schedule","slug":"schedule","link":"#schedule","children":[]},{"level":3,"title":"show_task","slug":"show-task","link":"#show-task","children":[]},{"level":3,"title":"show_stat","slug":"show-stat","link":"#show-stat","children":[]},{"level":3,"title":"math_state_restore","slug":"math-state-restore","link":"#math-state-restore","children":[]},{"level":3,"title":"sys_pause","slug":"sys-pause","link":"#sys-pause","children":[]},{"level":3,"title":"sleep_on","slug":"sleep-on","link":"#sleep-on","children":[]},{"level":3,"title":"interruptible_sleep_on","slug":"interruptible-sleep-on","link":"#interruptible-sleep-on","children":[]},{"level":3,"title":"wake_up","slug":"wake-up","link":"#wake-up","children":[]},{"level":3,"title":"ticks_to_floppy_on","slug":"ticks-to-floppy-on","link":"#ticks-to-floppy-on","children":[]},{"level":3,"title":"floppy_on","slug":"floppy-on","link":"#floppy-on","children":[]},{"level":3,"title":"floppy_off","slug":"floppy-off","link":"#floppy-off","children":[]},{"level":3,"title":"do_floppy_timer","slug":"do-floppy-timer","link":"#do-floppy-timer","children":[]},{"level":3,"title":"add_timer","slug":"add-timer","link":"#add-timer","children":[]},{"level":3,"title":"do_timer","slug":"do-timer","link":"#do-timer","children":[]},{"level":3,"title":"sys_alarm","slug":"sys-alarm","link":"#sys-alarm","children":[]},{"level":3,"title":"sys_getpid","slug":"sys-getpid","link":"#sys-getpid","children":[]},{"level":3,"title":"sys_getppid","slug":"sys-getppid","link":"#sys-getppid","children":[]},{"level":3,"title":"sys_getuid","slug":"sys-getuid","link":"#sys-getuid","children":[]},{"level":3,"title":"sys_geteuid","slug":"sys-geteuid","link":"#sys-geteuid","children":[]},{"level":3,"title":"sys_getgid","slug":"sys-getgid","link":"#sys-getgid","children":[]},{"level":3,"title":"sys_getegid","slug":"sys-getegid","link":"#sys-getegid","children":[]},{"level":3,"title":"sys_nice","slug":"sys-nice","link":"#sys-nice","children":[]},{"level":3,"title":"sched_init","slug":"sched-init","link":"#sched-init","children":[]}]}],"git":{"createdTime":1680579191000,"updatedTime":1712753865000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":8}]},"readingTime":{"minutes":13.31,"words":3994},"filePathRelative":"posts/Linux/kernel/Linux-0.11/Linux-0.11-kernel-sched.md","localizedDate":"2023年4月4日","excerpt":"<ul>\\n<li><a href=\\"#linux-011-kernel%E7%9B%AE%E5%BD%95%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86schedc%E8%AF%A6%E8%A7%A3\\">Linux-0.11 kernel目录进程管理sched.c详解</a>\\n<ul>\\n<li><a href=\\"#%E6%A8%A1%E5%9D%97%E7%AE%80%E4%BB%8B\\">模块简介</a></li>\\n<li><a href=\\"#%E5%87%BD%E6%95%B0%E8%AF%A6%E8%A7%A3\\">函数详解</a>\\n<ul>\\n<li><a href=\\"#schedule\\">schedule</a></li>\\n<li><a href=\\"#show_task\\">show_task</a></li>\\n<li><a href=\\"#show_stat\\">show_stat</a></li>\\n<li><a href=\\"#math_state_restore\\">math_state_restore</a></li>\\n<li><a href=\\"#sys_pause\\">sys_pause</a></li>\\n<li><a href=\\"#sleep_on\\">sleep_on</a></li>\\n<li><a href=\\"#interruptible_sleep_on\\">interruptible_sleep_on</a></li>\\n<li><a href=\\"#wake_up\\">wake_up</a></li>\\n<li><a href=\\"#ticks_to_floppy_on\\">ticks_to_floppy_on</a></li>\\n<li><a href=\\"#floppy_on\\">floppy_on</a></li>\\n<li><a href=\\"#floppy_off\\">floppy_off</a></li>\\n<li><a href=\\"#do_floppy_timer\\">do_floppy_timer</a></li>\\n<li><a href=\\"#add_timer\\">add_timer</a></li>\\n<li><a href=\\"#do_timer\\">do_timer</a></li>\\n<li><a href=\\"#sys_alarm\\">sys_alarm</a></li>\\n<li><a href=\\"#sys_getpid\\">sys_getpid</a></li>\\n<li><a href=\\"#sys_getppid\\">sys_getppid</a></li>\\n<li><a href=\\"#sys_getuid\\">sys_getuid</a></li>\\n<li><a href=\\"#sys_geteuid\\">sys_geteuid</a></li>\\n<li><a href=\\"#sys_getgid\\">sys_getgid</a></li>\\n<li><a href=\\"#sys_getegid\\">sys_getegid</a></li>\\n<li><a href=\\"#sys_nice\\">sys_nice</a></li>\\n<li><a href=\\"#sched_init\\">sched_init</a></li>\\n</ul>\\n</li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}');export{e as data};