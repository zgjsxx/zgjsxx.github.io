const e=JSON.parse('{"key":"v-1eb4fa68","path":"/posts/Linux/Linux-0.11-kernel-sched.html","title":"Linux-0.11 kernel目录进程管理sched.c详解","lang":"zh-CN","frontmatter":{"category":["Linux"],"tag":["Linux-0.11代码解读系列"],"description":"Linux-0.11 kernel目录进程管理sched.c详解 sched.c主要功能是负责进程的调度，其最核心的函数就是schedule。 schedule void schedule(void)","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/Linux-0.11-kernel-sched.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux-0.11 kernel目录进程管理sched.c详解"}],["meta",{"property":"og:description","content":"Linux-0.11 kernel目录进程管理sched.c详解 sched.c主要功能是负责进程的调度，其最核心的函数就是schedule。 schedule void schedule(void)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-05T13:07:36.000Z"}],["meta",{"property":"article:tag","content":"Linux-0.11代码解读系列"}],["meta",{"property":"article:modified_time","content":"2023-03-05T13:07:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux-0.11 kernel目录进程管理sched.c详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-03-05T13:07:36.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"schedule","slug":"schedule","link":"#schedule","children":[]},{"level":2,"title":"show_task","slug":"show-task","link":"#show-task","children":[]},{"level":2,"title":"show_stat","slug":"show-stat","link":"#show-stat","children":[]},{"level":2,"title":"math_state_restore","slug":"math-state-restore","link":"#math-state-restore","children":[]},{"level":2,"title":"sys_pause","slug":"sys-pause","link":"#sys-pause","children":[]},{"level":2,"title":"sleep_on","slug":"sleep-on","link":"#sleep-on","children":[]},{"level":2,"title":"wake_up","slug":"wake-up","link":"#wake-up","children":[]},{"level":2,"title":"ticks_to_floppy_on","slug":"ticks-to-floppy-on","link":"#ticks-to-floppy-on","children":[]},{"level":2,"title":"floppy_on","slug":"floppy-on","link":"#floppy-on","children":[]},{"level":2,"title":"floppy_off","slug":"floppy-off","link":"#floppy-off","children":[]},{"level":2,"title":"do_floppy_timer","slug":"do-floppy-timer","link":"#do-floppy-timer","children":[]},{"level":2,"title":"add_timer","slug":"add-timer","link":"#add-timer","children":[]},{"level":2,"title":"do_timer","slug":"do-timer","link":"#do-timer","children":[]},{"level":2,"title":"sys_alarm","slug":"sys-alarm","link":"#sys-alarm","children":[]},{"level":2,"title":"sys_getpid","slug":"sys-getpid","link":"#sys-getpid","children":[]},{"level":2,"title":"sys_getppid","slug":"sys-getppid","link":"#sys-getppid","children":[]},{"level":2,"title":"sys_getuid","slug":"sys-getuid","link":"#sys-getuid","children":[]},{"level":2,"title":"sys_geteuid","slug":"sys-geteuid","link":"#sys-geteuid","children":[]},{"level":2,"title":"sys_getgid","slug":"sys-getgid","link":"#sys-getgid","children":[]},{"level":2,"title":"sys_getegid","slug":"sys-getegid","link":"#sys-getegid","children":[]},{"level":2,"title":"sys_nice","slug":"sys-nice","link":"#sys-nice","children":[]},{"level":2,"title":"sched_init","slug":"sched-init","link":"#sched-init","children":[]}],"git":{"createdTime":1676357636000,"updatedTime":1678021656000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":5},{"name":"zgjsxx","email":"119160625@qq.com","commits":2}]},"readingTime":{"minutes":4.87,"words":1460},"filePathRelative":"posts/Linux/Linux-0.11-kernel-sched.md","localizedDate":"2023年2月14日","excerpt":"<h1> Linux-0.11 kernel目录进程管理sched.c详解</h1>\\n<p>sched.c主要功能是负责进程的调度，其最核心的函数就是schedule。</p>\\n<h2> schedule</h2>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token keyword\\">void</span> <span class=\\"token function\\">schedule</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">)</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
