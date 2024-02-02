import tkinter as tk
from tkinter import Canvas
import re
import os

current_mode = 'edit'

def update_js_file(edit_mode):
    file_path = 'C:/Users/naiki/Desktop/Programming/BingoBoardReolution2024/version_2/bingo.js'

    mode_str = 'true' if edit_mode else 'false'

    with open(file_path, 'r+') as file:
        content = file.read()
        content = re.sub(r'let isEditMode = (true|false);', f'let isEditMode = {mode_str};', content)

        file.seek(0)
        file.write(content)
        file.truncate()

def update_indicators(edit_mode):
    global current_mode
    current_mode = 'edit' if edit_mode else 'view'
    mode_canvas.itemconfig(edit_indicator, fill=("green" if edit_mode else "white"))
    mode_canvas.itemconfig(view_indicator, fill=("green" if not edit_mode else "white"))
    update_js_file(edit_mode)

def set_edit_mode():
    update_indicators(True)

def set_view_mode():
    update_indicators(False)

def create_indicator(canvas, x, y, radius, mode):
    color = "green" if current_mode == mode else "white"
    return canvas.create_oval(x - radius, y - radius, x + radius, y + radius, fill=color)

root = tk.Tk()
root.title("Edit Mode Toggle")
root.geometry("400x300")

# Get the screen dimension
screen_width = root.winfo_screenwidth()
screen_height = root.winfo_screenheight()

# Find the center point
center_x = int(screen_width/2 - 400/2)
center_y = int(screen_height/2 - 300/2)

# Set the position of the window to the center of the screen
root.geometry(f'+{center_x}+{center_y}')

# Canvas for mode indicators
mode_canvas = Canvas(root, width=400, height=50)
mode_canvas.pack(pady=(50, 0))

# Indicators for edit and view mode
edit_indicator = create_indicator(mode_canvas, 100, 25, 10, 'edit')
view_indicator = create_indicator(mode_canvas, 300, 25, 10, 'view')

# Buttons
button_frame = tk.Frame(root)
button_frame.pack(fill='x', pady=20)

edit_button = tk.Button(button_frame, text="Edit", command=set_edit_mode, height=2, width=10)
edit_button.pack(side=tk.LEFT, padx=50, expand=True)

view_button = tk.Button(button_frame, text="View", command=set_view_mode, height=2, width=10)
view_button.pack(side=tk.LEFT, padx=50, expand=True)

root.mainloop()
