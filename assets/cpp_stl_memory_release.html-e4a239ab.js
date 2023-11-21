import{_ as e,V as s,W as t,a0 as n}from"./framework-9a29aaa0.js";const a={},c=n(`<div class="language-CPP line-numbers-mode" data-ext="CPP"><pre class="language-CPP"><code>{ 
    std::vector&lt;int&gt; tmp;   
    vec.swap(tmp); 
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>//使用一个局部变量空的容器temp，与vec交换，退出temp作用域后，temp会释放自己的空间，而此时vec已经是空的容器</p><p>list的成员函数erase、remove和clear都会自动调用元素各自的析构函数，所以如果元素是自己定义的类，并且有完善的析构函数，则直接删除即可。这类链式存储，一个元素一个元素递增空间的结构，这些函数可以真正地改变list占用的内存大小。</p>`,3),l=[c];function i(r,d){return s(),t("div",null,l)}const o=e(a,[["render",i],["__file","cpp_stl_memory_release.html.vue"]]);export{o as default};
