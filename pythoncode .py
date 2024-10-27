import requests
from requests.auth import HTTPBasicAuth
import json

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

def replace_ids_with_urls(user_meta, media_data):
    """Replace media IDs in user meta with URLs."""
    # Replace profile_picture
    if "profile-picture" in user_meta and user_meta["profile-picture"]:
        profile_url = get_media_url_by_id(media_data, user_meta["profile-picture"])
        if profile_url:
            user_meta["profile-picture"] = profile_url

    # Replace gallery IDs with URLs
    if "gallery" in user_meta and isinstance(user_meta["gallery"], list):
        user_meta["gallery"] = [
            get_media_url_by_id(media_data, media_id)
            for media_id in user_meta["gallery"]
        ]

    # Replace single video ID with URL (updated for "video")
    if "video" in user_meta and user_meta["video"]:
        video_url = get_media_url_by_id(media_data, user_meta["video"])
        if video_url:
            user_meta["video"] = video_url
        else:
            print(f"Video ID {user_meta['video']} not found in media data.")

    return user_meta

def map_to_new_format(user, user_meta):
    """Map the old WordPress user data to the new format."""
    return {
        "wctId": f"WCT{user['id']}",
        "whatsappNumber": user_meta.get("whatsapp-number", ""),
        "profilePictureUrl": user_meta.get("profile-picture", ""),
        "role": "talent",  # Assuming all users are talent
        "gender": user_meta.get("gender", "male"),  # Assuming default gender is male
        "bio": user.get("description", "Aspiring actor with a passion for theatre and film."),
        "galleryDetails": {
            "photos": user_meta.get("gallery", []),
            "videos": [user_meta.get("video")] if user_meta.get("video") else []
        },
        "Name": user["name"],
        "email": user.get("name", "noemail@example.com"),
        "profile": {
            "statusLevel": "active",
            "firstName": user.get("first_name", "Unknown"),
            "lastName": user.get("last_name", "Unknown"),
            "screenName": user_meta.get("screen_name", "Unknown"),
            "dateOfBirth": user_meta.get("date_of_birth", ""),
            "faceCloseupPicture": user_meta.get("face_closeup_picture", ""),
            "faceReactionVideo": user_meta.get("face_reaction_video", ""),
            "fathersName": user_meta.get("fathers_name", ""),
            "mothersName": user_meta.get("mothers_name", ""),
            "experienceLevel": user_meta.get("experience_level", ""),
            "maritalStatus": user_meta.get("marital_status", ""),
            "educationalQualification": user_meta.get("educational_qualification", ""),
            "receiveNotificationOnWhatsApp": user_meta.get("receive_notification_on_whatsapp", False),
            "nativeState": user_meta.get("native_state", ""),
            "nationality": user_meta.get("nationality", ""),
            "nativePlace": user_meta.get("native_place", ""),
            "currentCity": user_meta.get("current_city", ""),
            "address": user_meta.get("address", ""),
            "speakingLanguages": user_meta.get("speaking_languages", []),
            "readingLanguages": user_meta.get("reading_languages", []),
            "heart": user_meta.get("heart", "follow"),
            "profileViewers": user_meta.get("profile_viewers", []),
            "company": user_meta.get("company", "Unknown"),
            "physicalDetails": {
                "height": user_meta.get("height", 0),
                "weight": user_meta.get("weight", 0),
                "eyeColor": user_meta.get("eye_color", ""),
                "hairColor": user_meta.get("hair_color", ""),
                "skinTone": user_meta.get("skin_tone", ""),
                "bodyType": user_meta.get("body_type", ""),
                "tattoos": user_meta.get("tattoos", False),
                "piercings": user_meta.get("piercings", False)
            },
            "workDetails": {
                "experience": user_meta.get("experience", ""),
                "projects": user_meta.get("projects", []),
                "availability": user_meta.get("availability", "Freelance")
            },
            "skillDetails": {
                "skills": user_meta.get("skills", []),
                "certifications": user_meta.get("certifications", [])
            },
            "socialMedia": user_meta.get("social_media", {}),
            "interests": user_meta.get("interests", {})
        },
        "companyId": user_meta.get("company_id", ""),
        "projects": user_meta.get("projects", []),
        "crew": user_meta.get("crew", []),
        "isApproved": user_meta.get("is_approved", False),
        "bookmarks": user_meta.get("bookmarks", []),
        "tags": user_meta.get("tags", [])
    }

try:
    # Fetch all users and media with authentication
    users = fetch_all_data(user_url)
    print(f"{len(users)} users fetched successfully.")

    media = fetch_all_data(media_url)
    print(f"{len(media)} media items fetched successfully.")

    # Combine user with their media data (profile_picture, gallery, video)
    combined_data = []
    for user in users:
        # Get user meta data and replace media IDs with URLs
        user_meta = user.get("meta", {})
        updated_meta = replace_ids_with_urls(user_meta, media)

        # Map to new format
        new_format_user = map_to_new_format(user, updated_meta)

        # Add the updated user data with media URLs
        combined_data.append(new_format_user)

    # Export the combined data to a JSON file
    with open("wp_users_with_new_format.json", "w") as output_file:
        json.dump(combined_data, output_file, indent=4)
    print("Export completed: wp_users_with_new_format.json")

except Exception as e:
    print(f"An error occurred: {e}")
