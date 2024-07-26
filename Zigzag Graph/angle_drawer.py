'''
    changes required:
    start the next line from the lowest point of the preceeding line
    one logic could be to find the lowest point and start the following line from that point
    (which is the end of the preceeding line).

    Feel free to explore and make your own solutions just the output should be desired one.
'''
import cv2
import numpy as np

def draw_lines(angle1_degrees, angle2_degrees, angle3_degrees, canvas_size=(600, 600)):
    # Create a blank canvas
    canvas = np.ones((canvas_size[1], canvas_size[0], 3), dtype=np.uint8) * 255
    
    # Calculate the length of the lines
    length = min(canvas_size) // 5  # Adjust the length of the lines
    
    # Calculate the endpoints of the lines
    center_x, center_y = canvas_size[0] // 2, canvas_size[1] // 2
    angle1_radians = np.radians(angle1_degrees)
    end_x1 = int(center_x + length * np.sin(angle1_radians))
    end_y1 = int(center_y - length * np.cos(angle1_radians))
    
    angle2_radians = np.radians(angle2_degrees)
    end_x2 = int(end_x1 + length * np.sin(angle2_radians))
    end_y2 = int(end_y1 + length * np.cos(angle2_radians))
    
    angle3_radians = np.radians(angle3_degrees)
    end_x3 = int(end_x2 + length * np.sin(angle3_radians))
    end_y3 = int(end_y2 - length * np.cos(angle3_radians))
    
    # Draw the lines 
    purple_color = (128, 0, 128)
    cv2.line(canvas, (center_x, center_y), (end_x1, end_y1), purple_color, 2)  
    cv2.line(canvas, (end_x1, end_y1), (end_x2, end_y2), purple_color, 2)  
    cv2.line(canvas, (end_x2, end_y2), (end_x3, end_y3), purple_color, 2)  
    
    # Display the canvas
    cv2.imshow("Canvas", canvas)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    # Save the image
    cv2.imwrite("graph.jpg", canvas)

# Draw three lines: 
# 1. At 18 degrees from the vertical axis
# 2. At 60 degrees from the first line
# 3. At 108 degrees from the vertical axis from the endpoint of the second line

# uncomment this to test
# or visit the api.py file to test from the api easily
# draw_lines(0, 71, 126, (600, 600))

# 0.592
# 60, 71, 126

