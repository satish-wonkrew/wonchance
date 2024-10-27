import requests
from requests.auth import HTTPBasicAuth
import json
import cloudinary.uploader

# Cloudinary configuration (replace with your actual Cloudinary credentials)
cloudinary.config(
    cloud_name="djdvn5pcj",
    api_key="871293416441763",
    api_secret="nnx1Xc-UJM0yNdznOOHDWPaTMO8"
)

# WordPress REST API URLs
user_url = "https://wonchance.com/wp-json/wp/v2/users"
media_url = "https://wonchance.com/wp-json/wp/v2/media"

# Example credentials (replace with your actual username and password)
username = "vijayj"
password = "krU7 NU27 B1pp V9Vc eEt9 jyYp"

def fetch_all_data(url):
    """Fetch all pages of data from a given API URL."""
    data = []
    page = 1
    while True:
        response = requests.get(
            url, auth=HTTPBasicAuth(username, password), params={"page": page}
        )
        if response.status_code == 200:
            items = response.json()
            if not items:  # No more items, break the loop
                break
            data.extend(items)
            page += 1
        else:
            print(f"Error fetching data: {response.status_code}")
            print(response.text)
            break
    return data

def get_media_url_by_id(media_data, media_id):
    """Fetch the media URL by media ID."""
    for media in media_data:
        if str(media["id"]) == str(media_id):  # Match ID as string
            return media["source_url"]
    return None

def upload_to_cloudinary(file_url, folder="wp_media"):
    """Upload a media file to Cloudinary."""
    try:
        upload_response = cloudinary.uploader.upload(file_url, folder=folder)
        return upload_response['secure_url']
    except Exception as e:
        print(f"Failed to upload {file_url} to Cloudinary: {e}")
        return None

def replace_ids_with_urls(user_meta, media_data):
    """Replace media IDs in user meta with Cloudinary URLs."""
    # Replace profile_picture
    if "profile-picture" in user_meta and user_meta["profile-picture"]:
        profile_url = get_media_url_by_id(media_data, user_meta["profile-picture"])
        if profile_url:
            cloudinary_url = upload_to_cloudinary(profile_url, folder="profile_pictures")
            if cloudinary_url:
                user_meta["profile-picture"] = cloudinary_url

    # Replace gallery IDs with Cloudinary URLs
    if "gallery" in user_meta and isinstance(user_meta["gallery"], list):
        user_meta["gallery"] = [
            upload_to_cloudinary(get_media_url_by_id(media_data, media_id), folder="gallery")
            for media_id in user_meta["gallery"]
        ]

    # Replace single video ID with Cloudinary URL
    if "video" in user_meta and user_meta["video"]:
        video_url = get_media_url_by_id(media_data, user_meta["video"])
        if video_url:
            cloudinary_url = upload_to_cloudinary(video_url, folder="videos")
            if cloudinary_url:
                user_meta["video"] = cloudinary_url

    return user_meta

def map_to_new_format(user, user_meta):
    """Map the old WordPress user data to the new format."""
    return {
        
    "wctId": f"WCT{user['id']}",
    "whatsappNumber": user_meta.get("whatsapp-number", ""),
    "profilePictureUrl": user_meta.get("profile-picture", ""),
    "role": user_meta.get("role", "talent"),  # Assuming all users are talent by default
    "gender": user_meta.get("gender", "male"),  # Default to male
    "bio": user.get("description", "Aspiring actor with a passion for theatre and film."),
    "galleryDetails": {
        "photos": user_meta.get("gallery", []),
        "videos": [user_meta.get("video")] if user_meta.get("video") else []
    },
    "Name": user.get("name", ""),
    "email": user.get("email", ""),
    "profile": {
        "statusLevel": user_meta.get("statusLevel", "active"),
        "firstName": user_meta.get("first_name", ""),
        "lastName": user_meta.get("last_name", ""),
        "screenName": user_meta.get("screen_name", ""),
        "dateOfBirth": user_meta.get("date_of_birth", ""),
        "gender":user_meta.get("gender",""),
       
        "fatherName": user_meta.get("father_name", ""),
        "motherName": user_meta.get("mother_name", ""),
        "faceCloseupPicture": user_meta.get("face_closeup_picture", ""),
        "faceReactionVideo": user_meta.get("face_reaction_video", ""),
        "fathersName": user_meta.get("fathers_name", ""),
        "mothersName": user_meta.get("mothers_name", ""),
        "experienceLevel": user_meta.get("experience_level", "Beginner"),
        "maritalStatus": user_meta.get("marital_status", ""),
        "educationalQualification": user_meta.get("educational_qualification", ""),
        "receiveNotificationOnWhatsApp": user_meta.get("receive-notification-on-whatsapp"),
        "nativeState": user_meta.get("native_state", ""),
        "nationality": user_meta.get("nationality", ""),
        "nativePlace": user_meta.get("native-place", ""),
        "currentCity": user_meta.get("current_city", ""),
        "address": user_meta.get("address", ""),
        "speakingLanguages": user_meta.get("speaking_languages", []),
        "readingLanguages": user_meta.get("reading_languages", []),
        "heart": user_meta.get("heart", "follow"),
        "profileViewers": user_meta.get("profile_viewers", []),
        "company": user_meta.get("company", ""),
        "physicalDetails": {
            "height": user_meta.get("height", 0),
            "weight": user_meta.get("weight", 0),
            "eyeColor": user_meta.get("eye_color", ""),
            "hairColor": user_meta.get("hair_color", ""),
            "skinTone": user_meta.get("skin_tone", ""),
            "bodyType": user_meta.get("body_type", ""),
            "tattoos": user_meta.get("tattoos", False),
            "piercings": user_meta.get("piercings", False),
            
            "bodyShapeWomen":user_meta.get("body-shape-women",""),
           
            "bodyShapeMen":user_meta.get("body-shape-men",""),
           
            "chest": user_meta.get("chest", 0),  # Added missing field for chest
            "bust": user_meta.get("bust", 0),    # Added missing field for bust
            "waist": user_meta.get("waist", 0),  # Added missing field for waist
            "hips": user_meta.get("hips", 0),    # Added missing field for hips
            "shoeSize": user_meta.get("shoe_size", 0)  # Added missing field for shoe size
        },
        "workDetails": {
            "experience": user_meta.get("experience", ""),
            "projects": user_meta.get("projects", []),
            "availability": user_meta.get("availability", "Freelance"),
            "upcomingProjects": user_meta.get("upcoming_projects", ""),  # Added missing field for upcoming projects
            "shootPerDay": user_meta.get("shoot_per_day", 0),  # Added missing field for shoot per day
            "achievements": user_meta.get("achievements", "")  # Added missing field for achievements
        },
        "skillDetails": {
            "skills": user_meta.get("skills", []),
            "certifications": user_meta.get("certifications", []),
            "singing": user_meta.get("singing", ""),
            "danceStyle": user_meta.get("dance_style", ""),
            "martialArts": user_meta.get("martial_arts", ""),
            "waterActivites": user_meta.get("water_activites", "")
        },
        "socialMedia": {
            "facebook": user_meta.get("facebook", ""),
            "instagram": user_meta.get("instagram", ""),
            "twitter": user_meta.get("twitter", "")
        },
        "interests": {
            "hobbies": user_meta.get("hobbies", []),
            "genres": user_meta.get("genres", []),
            "interestedmedia": user_meta.get("interestedmedia", []),
            "interestedroles": user_meta.get("interestedroles", []),
            "comfortablewith": user_meta.get("comfortablewith", []),
            "comfortableclothing": user_meta.get("comfortableclothing", [])
        }
    },
    "companyId": user_meta.get("company_id", ""),
    "projects": user_meta.get("projects", []),
    "crew": user_meta.get("crew", []),
    "isApproved": user_meta.get("is_approved", False),
    "bookmarks": user_meta.get("bookmarks", []),
    "tags": user_meta.get("tags", []),
    "bankingDetails": {  # Added missing banking details field
        "accountHolderName": user_meta.get("account_holder_name", ""),
        "accountNumber": user_meta.get("account_number", ""),
        "bankName": user_meta.get("bank_name", ""),
        "branchName": user_meta.get("branch_name", ""),
        "ifscCode": user_meta.get("ifsc_code", "")
    },
    "referral": {  # Added missing referral field
        "code": user_meta.get("referral_code", ""),
        "referredBy": user_meta.get("referred_by", "")
    }
}

try:
    # Fetch the first 10 users and media with authentication
    users = fetch_all_data(user_url)[:10]
    print(f"{len(users)} users fetched successfully.")

    media = fetch_all_data(media_url)
    print(f"{len(media)} media items fetched successfully.")

    # Combine user with their media data (profile_picture, gallery, video)
    combined_data = []
    for user in users:
        # Get user meta data and replace media IDs with Cloudinary URLs
        user_meta = user.get("meta", {})
        updated_meta = replace_ids_with_urls(user_meta, media)

        # Map to new format
        new_format_user = map_to_new_format(user, updated_meta)

        # Add the updated user data with media URLs
        combined_data.append(new_format_user)

    # Export the combined data to a JSON file
    with open("wp_users_with_new_format_sample.json", "w") as output_file:
        json.dump(combined_data, output_file, indent=4)
    print("Export completed: wp_users_with_new_format_sample.json")

except Exception as e:
    print(f"An error occurred: {e}")