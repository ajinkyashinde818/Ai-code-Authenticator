import re

def analyze_code(code):
    lines = code.split('\n')
    total_lines = len(lines)
    ai_like_lines = 0

    ai_patterns = [
        r"#.*",  # comments
        r"def .*?\(",  # Python-style functions
        r"(System\.out\.println|print)",  # print statements
        r"//.*",  # single-line comments in Java/C++
        r"/\*.*\*/",  # multi-line comment blocks
        r"import .*",  # imports
        r"from .* import .*"
    ]

    for line in lines:
        for pattern in ai_patterns:
            if re.search(pattern, line.strip()):
                ai_like_lines += 1
                break

    ai_percent = (ai_like_lines / total_lines * 100) if total_lines else 0

    return {
        "total_lines": total_lines,
        "ai_like_lines": ai_like_lines,
        "ai_percent": round(ai_percent, 2)
    }
