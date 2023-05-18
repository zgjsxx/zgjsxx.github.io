import{_ as e,V as i,W as l,a0 as a}from"./framework-9a29aaa0.js";const t={},r=a('<h1 id="effective-c-50-了解new和delete的合理替换时机" tabindex="-1"><a class="header-anchor" href="#effective-c-50-了解new和delete的合理替换时机" aria-hidden="true">#</a> effective c++ 50 了解new和delete的合理替换时机</h1><p>本文主要讲解什么场景下我们需要替换编译器提供的operator new或者operator delete。其实平常开发项目中很少会重载operator new和operator delete， 如果出现了这样的需求可以回过头来再来温习温习本节的内容。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><ul><li>用来检测运用上的错误。</li><li>为了强化效能</li><li>为了收集使用上的统计数据</li><li>为了检测运用错误</li><li>为了收集动态分配内存之使用统计信息</li><li>为了增加分配和归还的速度。</li><li>为了降低缺省内存管理器带来的空间额外开销。</li><li>为了弥补缺省分配器中的非最佳齐位</li><li>为了将相关对象成簇集中</li><li>为了获得非传统的行为</li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>有许多理由需要写个自定的new和delete，包括改善性能、对heap运用错误进行调试、收集heap使用信息。</li></ul>',6),c=[r];function d(n,o){return i(),l("div",null,c)}const f=e(t,[["render",d],["__file","effective-cpp-50.html.vue"]]);export{f as default};
