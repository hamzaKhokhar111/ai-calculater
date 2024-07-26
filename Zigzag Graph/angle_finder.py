'''
    Using this file we calculate the angle given in the images of the excel file
    all of them are not tested and there was an issue with the angle at 9 according to the client
    again feel free to explore and come up with your own solutions but the output should be the desired one
'''
import cv2
import numpy as np

def find_angle(image_path):
    # Read the image
    image = cv2.imread(image_path)
    
    # Convert image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Apply Gaussian blur to reduce noise
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    
    # Apply edge detection
    edges = cv2.Canny(blurred, 50, 150, apertureSize=3)
    
    # Find lines using Hough Transform
    lines = cv2.HoughLines(edges, 1, np.pi/180, 100)
    
    if lines is not None:
        # Iterate through each line and find its angle with x-axis
        for line in lines:
            rho, theta = line[0]
            angle = np.degrees(theta)
            print("Angle with x-axis:", angle)
    else:
        print("No lines detected in the image.")

# Example usage
image_path = "1.png"
print(image_path)
print()
find_angle(image_path)

# Example usage
image_path = "2.png"
print(image_path)
print()
find_angle(image_path)

# Example usage
image_path = "3.png"
print(image_path)
print()
find_angle(image_path)

# Example usage
image_path = "4.png"
print(image_path)
print()
find_angle(image_path)

# Example usage
image_path = "5.png"
print(image_path)
print()
find_angle(image_path)

# Example usage
image_path = "6.png"
print(image_path)
print()
find_angle(image_path)

# Example usage
image_path = "7.png"
print(image_path)
print()
find_angle(image_path)

# Example usage
image_path = "8.png"
print(image_path)
print()
find_angle(image_path)

# Example usage
image_path = "9.png"
print(image_path)
print()
find_angle(image_path)
