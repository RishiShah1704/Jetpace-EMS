Dim fso, scriptDir, WshShell
Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = scriptDir
WshShell.Run "node start.js", 0, False
Set WshShell = Nothing
Set fso = Nothing
