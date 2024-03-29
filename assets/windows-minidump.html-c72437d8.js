import{_ as n,V as s,W as a,a0 as p}from"./framework-9a29aaa0.js";const t={},e=p(`<p>windows版本生成minidump</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;Windows.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;Dbghelp.h&gt;</span></span>

<span class="token keyword">void</span> <span class="token function">make_minidump</span><span class="token punctuation">(</span>EXCEPTION_POINTERS<span class="token operator">*</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">auto</span> hDbgHelp <span class="token operator">=</span> <span class="token function">LoadLibraryA</span><span class="token punctuation">(</span><span class="token string">&quot;dbghelp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>hDbgHelp <span class="token operator">==</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token keyword">auto</span> pMiniDumpWriteDump <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">decltype</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>MiniDumpWriteDump<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token function">GetProcAddress</span><span class="token punctuation">(</span>hDbgHelp<span class="token punctuation">,</span> <span class="token string">&quot;MiniDumpWriteDump&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>pMiniDumpWriteDump <span class="token operator">==</span> <span class="token keyword">nullptr</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>

    <span class="token keyword">char</span> name<span class="token punctuation">[</span>MAX_PATH<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">auto</span> nameEnd <span class="token operator">=</span> name <span class="token operator">+</span> <span class="token function">GetModuleFileNameA</span><span class="token punctuation">(</span><span class="token function">GetModuleHandleA</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> name<span class="token punctuation">,</span> MAX_PATH<span class="token punctuation">)</span><span class="token punctuation">;</span>
        SYSTEMTIME t<span class="token punctuation">;</span>
        <span class="token function">GetSystemTime</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">wsprintfA</span><span class="token punctuation">(</span>nameEnd <span class="token operator">-</span> <span class="token function">strlen</span><span class="token punctuation">(</span><span class="token string">&quot;.exe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token string">&quot;_%4d%02d%02d_%02d%02d%02d.dmp&quot;</span><span class="token punctuation">,</span>
            t<span class="token punctuation">.</span>wYear<span class="token punctuation">,</span> t<span class="token punctuation">.</span>wMonth<span class="token punctuation">,</span> t<span class="token punctuation">.</span>wDay<span class="token punctuation">,</span> t<span class="token punctuation">.</span>wHour<span class="token punctuation">,</span> t<span class="token punctuation">.</span>wMinute<span class="token punctuation">,</span> t<span class="token punctuation">.</span>wSecond<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">auto</span> hFile <span class="token operator">=</span> <span class="token function">CreateFileA</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> GENERIC_WRITE<span class="token punctuation">,</span> FILE_SHARE_READ<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> CREATE_ALWAYS<span class="token punctuation">,</span> FILE_ATTRIBUTE_NORMAL<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>hFile <span class="token operator">==</span> INVALID_HANDLE_VALUE<span class="token punctuation">)</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>

    MINIDUMP_EXCEPTION_INFORMATION exceptionInfo<span class="token punctuation">;</span>
    exceptionInfo<span class="token punctuation">.</span>ThreadId <span class="token operator">=</span> <span class="token function">GetCurrentThreadId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    exceptionInfo<span class="token punctuation">.</span>ExceptionPointers <span class="token operator">=</span> e<span class="token punctuation">;</span>
    exceptionInfo<span class="token punctuation">.</span>ClientPointers <span class="token operator">=</span> FALSE<span class="token punctuation">;</span>

    <span class="token keyword">auto</span> dumped <span class="token operator">=</span> <span class="token function">pMiniDumpWriteDump</span><span class="token punctuation">(</span>
        <span class="token function">GetCurrentProcess</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token function">GetCurrentProcessId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        hFile<span class="token punctuation">,</span>
        <span class="token function">MINIDUMP_TYPE</span><span class="token punctuation">(</span>MiniDumpWithIndirectlyReferencedMemory <span class="token operator">|</span> MiniDumpScanMemory<span class="token punctuation">)</span><span class="token punctuation">,</span>
        e <span class="token operator">?</span> <span class="token operator">&amp;</span>exceptionInfo <span class="token operator">:</span> <span class="token keyword">nullptr</span><span class="token punctuation">,</span>
        <span class="token keyword">nullptr</span><span class="token punctuation">,</span>
        <span class="token keyword">nullptr</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">CloseHandle</span><span class="token punctuation">(</span>hFile<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

LONG CALLBACK <span class="token function">unhandled_handler</span><span class="token punctuation">(</span>EXCEPTION_POINTERS<span class="token operator">*</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">make_minidump</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> EXCEPTION_CONTINUE_SEARCH<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">SetUnhandledExceptionFilter</span><span class="token punctuation">(</span>unhandled_handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> <span class="token operator">*</span>a <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
    <span class="token operator">*</span>a <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token operator">*</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(t,[["render",c],["__file","windows-minidump.html.vue"]]);export{k as default};
