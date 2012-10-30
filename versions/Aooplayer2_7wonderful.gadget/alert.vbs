sub sleeps(times)
    WScript.Sleep(times)
end sub

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

Function WinHTTPPostRequest(URL, FileName)

 FieldName = "file" 'Default field name
 UploadFile URL, FileName, FieldName

End Function

Sub do_vbsUpload()
  If WScript.Arguments.Count < 2 Then InfoEcho

  If InStr(CheckRequirements, "Error") > 0 Then InfoEcho

  Dim FileName, DestURL, FieldName
  FieldName = "file" 'Default field name

  Dim aCounter, Arg
  aCounter = 1 'Argument counter
  For Each Arg In WScript.Arguments
    Select Case aCounter
      Case 1: FileName = Arg
      Case 2: DestURL = Arg
      Case 3: FieldName = Arg
    End Select
    aCounter = aCounter + 1
  Next

  UploadFile DestURL, FileName, FieldName
End Sub

Sub UploadFile(DestURL, FileName, FieldName)
  Const Boundary = "---------------------------0123456789012"

  Dim FileContents, FormData
  FileContents = GetFile(FileName)

  FormData = BuildFormData(FileContents, Boundary, FileName, FieldName)

  IEPostBinaryRequest DestURL, FormData, Boundary
End Sub

Function BuildFormData(FileContents, Boundary, FileName, FieldName)
  Dim FormData, Pre, Po
  Const ContentType = "application/upload"

  Pre = "--" + Boundary + vbCrLf + mpFields(FieldName, FileName, ContentType)
  Po = vbCrLf + "--" + Boundary + "--" + vbCrLf

  Const adLongVarBinary = 205
  Dim RS: Set RS = CreateObject("ADODB.Recordset")
  RS.Fields.Append "b", adLongVarBinary, Len(Pre) + LenB(FileContents) + Len(Po)
  RS.Open
  RS.AddNew
    Dim LenData
    LenData = Len(Pre)
    RS("b").AppendChunk (StringToMB(Pre) & ChrB(0))
    Pre = RS("b").GetChunk(LenData)
    RS("b") = ""

    LenData = Len(Po)
    RS("b").AppendChunk (StringToMB(Po) & ChrB(0))
    Po = RS("b").GetChunk(LenData)
    RS("b") = ""

    RS("b").AppendChunk (Pre)
    RS("b").AppendChunk (FileContents)
    RS("b").AppendChunk (Po)
  RS.Update
  FormData = RS("b")
  RS.Close
  BuildFormData = FormData
End Function

Function IEPostBinaryRequest(URL, FormData, Boundary)
  Dim IE: Set IE = CreateObject("InternetExplorer.Application")

  IE.Navigate URL, , , FormData, _
    "Content-Type: multipart/form-data; boundary=" + Boundary + vbCrLf
  Do While IE.Busy
  Loop

  On Error Resume Next
  cach_response (IE.Document.body.innerHTML)
  IEPostBinaryRequest = IE.Document.body.innerHTML
  IE.Quit
End Function

Function mpFields(FieldName, FileName, ContentType)
  Dim MPTemplate 'template For multipart header
  MPTemplate = "Content-Disposition: form-data; name=""{field}"";" + _
   " filename=""{file}""" + vbCrLf + _
   "Content-Type: {ct}" + vbCrLf + vbCrLf
  Dim Out
  Out = Replace(MPTemplate, "{field}", FieldName)
  Out = Replace(Out, "{file}", FileName)
  mpFields = Replace(Out, "{ct}", ContentType)
End Function

Sub Wait(Seconds, Message)
  On Error Resume Next
  CreateObject("wscript.shell").Popup Message, Seconds, "", 64
End Sub

Function GetFile(FileName)
  Dim Stream: Set Stream = CreateObject("ADODB.Stream")
  Stream.Type = 1 'Binary
  Stream.Open
  Stream.LoadFromFile FileName
  GetFile = Stream.Read
  Stream.Close
End Function

Function StringToMB(S)
  Dim I, B
  For I = 1 To Len(S)
    B = B & ChrB(Asc(Mid(S, I, 1)))
  Next
  StringToMB = B
End Function
Sub InfoEcho()
  Dim Msg
  Msg = Msg + "Upload file using http And multipart/form-data" & vbCrLf
  Msg = Msg + "Copyright (C) 2001 Antonin Foller, PSTRUH Software" & vbCrLf
  Msg = Msg + "use" & vbCrLf
  Msg = Msg + "[cscript|wscript] fupload.vbs file url [fieldname]" & vbCrLf
  Msg = Msg + "  file ... Local file To upload" & vbCrLf
  Msg = Msg + "  url ... URL which can accept uploaded data" & vbCrLf
  Msg = Msg + "  fieldname ... Name of the source form field." & vbCrLf
  Msg = Msg + vbCrLf + CheckRequirements
  WScript.Echo Msg
  WScript.Quit
End Sub

Function CheckRequirements()
  Dim Msg
  Msg = "This script requires some objects installed To run properly." & vbCrLf
  Msg = Msg & CheckOneObject("ADODB.Recordset")
  Msg = Msg & CheckOneObject("ADODB.Stream")
  Msg = Msg & CheckOneObject("InternetExplorer.Application")
  CheckRequirements = Msg
End Function

Function CheckOneObject(oClass)
  Dim Msg
  On Error Resume Next
  CreateObject oClass
  If Err = 0 Then Msg = "OK" Else Msg = "Error:" & Err.Description
  CheckOneObject = oClass & " - " & Msg & vbCrLf
End Function

Function ReadBinaryFile(FileName)
  Const adTypeBinary = 1
  Dim BinaryStream
  Set BinaryStream = CreateObject("ADODB.Stream")
  BinaryStream.Type = adTypeBinary
  BinaryStream.Open
  BinaryStream.LoadFromFile FileName
  ReadBinaryFile = BinaryStream.Read
End Function


