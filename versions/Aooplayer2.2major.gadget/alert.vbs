sub alert(prompt)
    MsgBox prompt, 48 , "Aoo!Player"
end sub

function confirm(prompt)
    dim res
    res = MsgBox (prompt, 33, "Aoo!Player")
    if res=1 then
        confirm = true
    else
        confirm = false
    end if
end function