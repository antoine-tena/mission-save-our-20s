import io
import datetime
from typing import Any, Union
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.core.files.base import ContentFile
from django.utils import timezone
from PIL import Image, ImageDraw

from agenda.models import Event
from cinema.models import Movie
from games.models import GameType, GameSession
from stars.models import StargazingSpot
from photos.models import Photo
from social.models import Profile, SocialPost, RichPost, RichPostAttachment
from wishlist.models import WishlistItem

def create_solid_image(width: int, height: int, color_rgb: tuple[int, int, int]) -> ContentFile:
    """Crée une image de couleur unie avec cadre pour les tests."""
    image_io = io.BytesIO()
    image = Image.new("RGB", (width, height), color=color_rgb)
    draw = ImageDraw.Draw(image)
    draw.rectangle([5, 5, width - 5, height - 5], outline=(255, 255, 255), width=2)
    image.save(image_io, "JPEG")
    image_io.seek(0)
    return ContentFile(image_io.read(), name="dummy_seed.jpg")

def configure_profile(
    user_obj: User,
    bio_text: str,
    status_text: str,
    score_points: int,
    theme_color: tuple[int, int, int],
    name_prefix: str
) -> None:
    """Configure un profil d'utilisateur avec avatar et photo de couverture personnalisés."""
    user_profile, _ = Profile.objects.get_or_create(user=user_obj)
    user_profile.bio = bio_text
    user_profile.status = status_text
    user_profile.points = score_points
    user_profile.avatar.save(f"{name_prefix}_avatar.jpg", create_solid_image(150, 150, theme_color), save=False)
    user_profile.cover_image.save(f"{name_prefix}_cover.jpg", create_solid_image(800, 300, theme_color), save=False)
    user_profile.save()

def seed_users_and_profiles() -> tuple[User, User]:
    """Crée les utilisateurs principaux et configure leurs profils d'amitié."""
    user_antoine, _ = User.objects.get_or_create(username="antoine")
    configure_profile(
        user_obj=user_antoine,
        bio_text="Lyonnais d'origine, futur architecte de la donnée à Polytech Annecy. Passionné de programmation, de grands espaces, et toujours prêt pour un bivouac !",
        status_text="En train de coder une carte interactive... 💻🏕️",
        score_points=150,
        theme_color=(73, 109, 137),
        name_prefix="antoine"
    )
    user_amani, _ = User.objects.get_or_create(username="amani")
    configure_profile(
        user_obj=user_amani,
        bio_text="Parisienne libérée de la prépa CPGE. À Annecy pour profiter du lac, des montagnes, et de la liberté !",
        status_text="Randonnée ou cinéma ce soir ? 🌸🎬",
        score_points=180,
        theme_color=(196, 14, 117),
        name_prefix="amani"
    )
    user_antoine.profile.friends.add(user_amani.profile)
    return user_antoine, user_amani

def seed_events() -> None:
    """Génère des événements d'exemple dans le calendrier."""
    today_date = datetime.date.today()
    events_list = [
        {"title": "Week-end Bivouac au Semnoz", "date": today_date + datetime.timedelta(days=5), "description": "Randonnée de montée, bivouac.", "location": "Semnoz - Crêt de Châtillon"},
        {"title": "Soirée Cinéma Pathé Annecy", "date": today_date - datetime.timedelta(days=7), "description": "Film d'animation suivi d'un débat.", "location": "Cinéma Pathé Annecy"},
        {"title": "Anniversaire d'Antoine 🎂", "date": today_date + datetime.timedelta(days=12), "description": "Soirée surprise.", "location": "Plage de l'Impérial, Annecy"}
    ]
    for e in events_list:
        Event.objects.get_or_create(title=e["title"], defaults={k: v for k, v in e.items() if k != "title"})

def create_seed_movie(
    added_by_user: User,
    movie_data: dict[str, Union[str, int, float, datetime.datetime, None]],
    color_rgb: tuple[int, int, int]
) -> None:
    """Crée un film individuel avec son affiche personnalisée."""
    movie_obj, created = Movie.objects.get_or_create(
        title=str(movie_data["title"]),
        defaults={
            "date_seen": movie_data["date_seen"],
            "location": movie_data["location"],
            "latitude": movie_data["latitude"],
            "longitude": movie_data["longitude"],
            "tmdb_id": movie_data["tmdb_id"],
            "overview": movie_data["overview"],
            "director": movie_data["director"],
            "cast": movie_data["cast"],
            "runtime": movie_data["runtime"],
            "genres": movie_data["genres"],
            "antoine_review": movie_data["antoine_review"],
            "antoine_rating": movie_data["antoine_rating"],
            "amani_review": movie_data["amani_review"],
            "amani_rating": movie_data["amani_rating"],
            "added_by": added_by_user
        }
    )
    if created:
        movie_obj.poster.save(f"movie_{movie_obj.id}.jpg", create_solid_image(300, 450, color_rgb), save=True)

def seed_movies(user_antoine: User, user_amani: User) -> None:
    """Génère des films d'exemple."""
    today_dt = timezone.now()
    
    create_seed_movie(
        user_antoine,
        {
            "title": "Interstellar", "date_seen": today_dt - datetime.timedelta(days=20),
            "location": "Cinéma Pathé Annecy", "latitude": 45.9032, "longitude": 6.1214,
            "tmdb_id": 157336, "overview": "Un voyage intersidéral captivant.",
            "director": "Christopher Nolan", "cast": "Matthew McConaughey, Anne Hathaway",
            "runtime": 169, "genres": "Science-Fiction, Drame",
            "antoine_review": "Un pur chef-d'œuvre spatial.", "antoine_rating": 5,
            "amani_review": "Magnifique et déchirant.", "amani_rating": 4
        },
        (15, 23, 42)
    )

    create_seed_movie(
        user_amani,
        {
            "title": "Le Voyage de Chihiro", "date_seen": today_dt - datetime.timedelta(days=10),
            "location": "Bivouac au Semnoz", "latitude": 45.7981, "longitude": 6.1042,
            "tmdb_id": 129, "overview": "Une jeune fille dans le monde des esprits.",
            "director": "Hayao Miyazaki", "cast": "Rumi Hiiragi, Miyu Irino",
            "runtime": 125, "genres": "Animation, Fantastique",
            "antoine_review": "La poésie de Miyazaki est sans égal.", "antoine_rating": 4,
            "amani_review": "Mon Ghibli préféré de tous les temps ! Chef-d'œuvre absolu.", "amani_rating": 5
        },
        (219, 39, 119)
    )

def seed_games() -> None:
    """Génère les types de jeux et les sessions de jeu d'exemple."""
    billiard, _ = GameType.objects.get_or_create(name="Billard", defaults={"icon": "lucide:circle"})
    bowling, _ = GameType.objects.get_or_create(name="Bowling", defaults={"icon": "lucide:toy-brick"})
    boardgames, _ = GameType.objects.get_or_create(name="Jeux de société", defaults={"icon": "lucide:dices"})

    today_date = datetime.date.today()
    sessions_list = [
        {
            "game_type": billiard, "date": today_date - datetime.timedelta(days=6),
            "amani_score": 3, "antoine_score": 1,
            "location": "Le Bowl Annecy", "notes": "Amani a complètement dominé la table !"
        },
        {
            "game_type": bowling, "date": today_date - datetime.timedelta(days=4),
            "amani_score": 120, "antoine_score": 145,
            "location": "Le Bowl Annecy", "notes": "Revanche d'Antoine au bowling avec deux strikes d'affilée."
        },
        {
            "game_type": boardgames, "date": today_date - datetime.timedelta(days=2),
            "amani_score": 15, "antoine_score": 15,
            "location": "Appartement Annecy", "notes": "Partie acharnée de Splendor : égalité parfaite !"
        }
    ]
    for session_data in sessions_list:
        GameSession.objects.get_or_create(
            game_type=session_data["game_type"],
            date=session_data["date"],
            defaults={
                "amani_score": session_data["amani_score"],
                "antoine_score": session_data["antoine_score"],
                "location": session_data["location"],
                "notes": session_data["notes"]
            }
        )

def seed_stargazing() -> None:
    """Génère des spots d'observation d'étoiles."""
    today_date = datetime.date.today()
    spots = [
        {"name": "Semnoz - Crêt de Châtillon", "latitude": 45.7981, "longitude": 6.1042, "date": today_date - datetime.timedelta(days=3), "notes": "Ciel dégagé à 1700m. Voie Lactée."},
        {"name": "Col de la Forclaz", "latitude": 45.8111, "longitude": 6.2435, "date": today_date - datetime.timedelta(days=8), "notes": "Vue sur le lac. Observation de Jupiter."}
    ]
    for s in spots:
        StargazingSpot.objects.get_or_create(name=s["name"], defaults={k: v for k, v in s.items() if k != "name"})

def seed_photos(user_antoine: User, user_amani: User) -> None:
    """Vide la table et génère 50 photos de souvenirs sur l'unique mois de Juin 2026."""
    from photos.models import Album, AlbumPage
    Photo.objects.all().delete()
    AlbumPage.objects.all().delete()
    Album.objects.all().delete()

    lieux = [
        ("Semnoz", 45.7981, 6.1042), ("Lac d'Annecy", 45.8992, 6.1294),
        ("Col de la Forclaz", 45.8111, 6.2435), ("Aravis", 45.87, 6.35),
        ("Chamonix", 45.92, 6.87), ("Aiguille du Midi", 45.92, 6.87),
        ("Château de Menthon", 45.8642, 6.2033), ("Roc de Chère", 45.8450, 6.2150),
        ("Plage de Talloires", 45.8285, 6.2132), ("Gorges du Fier", 45.9015, 6.0435)
    ]
    acts = [
        ("Bivouac étoilé", "Ciel sublime."), ("Randonnée", "Montée sportive, vue superbe."),
        ("Coucher de soleil", "Le lac s'illumine."), ("Paddle", "Eau calme et translucide."),
        ("Pique-nique gourmand", "Fromage local et éclats de rire."), ("Observation céleste", "Jupiter visible !"),
        ("Rando cascades", "Gros dénivelé et rafraîchissant."), ("Café Mont-Blanc", "Seuls au monde.")
    ]
    colors = [(230, 90, 120), (74, 144, 226), (100, 100, 100), (37, 99, 235), (219, 39, 119), (16, 185, 129), (245, 158, 11)]
    for i in range(50):
        day = (i % 29) + 1
        curr_date = datetime.date(2026, 6, day)
        lieu, lat, lon = lieux[i % len(lieux)]
        act, desc = acts[(i * 3) % len(acts)]
        author = user_amani if i % 2 == 0 else user_antoine
        photo = Photo.objects.create(
            titre=f"{act} à {lieu} (#{i+1})",
            author=author,
            description=f"{desc} Souvenir d'{author.username}.",
            latitude=lat, longitude=lon
        )
        photo.image.save(f"bulk_{i+1}.jpg", create_solid_image(400, 300, colors[i % len(colors)]), save=True)
        dt = datetime.datetime.combine(curr_date, datetime.time(12, 0), tzinfo=datetime.timezone.utc)
        Photo.objects.filter(pk=photo.pk).update(date_creation=dt)

def seed_social_posts(user_antoine: User, user_amani: User) -> None:
    """Génère des publications de réseau social d'exemple."""
    posts_data = [
        {
            "author": user_amani,
            "caption": "La liberté retrouvée à Annecy ! Randonnée magnifique en perspective 🌸🏔️✨",
            "color": (219, 39, 119)
        },
        {
            "author": user_antoine,
            "caption": "Session dev face aux montagnes. Le bureau parfait à l'appart ! 💻🌲",
            "color": (37, 99, 235)
        }
    ]
    for post_info in posts_data:
        color_rgb = post_info.pop("color")
        post_obj, created = SocialPost.objects.get_or_create(
            author=post_info["author"],
            caption=post_info["caption"]
        )
        if created:
            post_obj.image.save(f"post_{post_obj.id}.jpg", create_solid_image(500, 500, color_rgb), save=True)

def seed_wishlist_items() -> None:
    """Génère des éléments de la liste de souhaits d'exemple."""
    items = [
        {"title": "Bivouac au Semnoz", "status": "DONE", "initiator": "BOTH", "is_favorite": True},
        {"title": "Voyage au Japon", "status": "IDEA", "initiator": "BOTH", "is_favorite": True, "price": 3000.00},
        {"title": "Cours de danse", "status": "IN_PROGRESS", "initiator": "AMANI", "is_favorite": False},
        {"title": "Monter à l'Aiguille du Midi", "status": "IDEA", "initiator": "ANTOINE", "is_favorite": False},
    ]
    for i in items:
        WishlistItem.objects.get_or_create(title=i["title"], defaults={k: v for k, v in i.items() if k != "title"})

def seed_rich_posts(user_antoine: User, user_amani: User) -> None:
    """Génère des publications riches d'exemple avec pièces jointes multiples."""
    post, created = RichPost.objects.get_or_create(
        author=user_antoine,
        title="Notre Bivouac de Rêve au Semnoz 🌌⛺",
        caption="Une nuit magique là-haut. Température fraîche, mais les cœurs étaient chauds !",
        location="Crêt de Châtillon, Semnoz"
    )
    if created:
        img_att = RichPostAttachment.objects.create(
            post=post, file_name="bivouac_stars.jpg", file_type="IMAGE",
            caption="La tente sous la Voie Lactée", location="Semnoz"
        )
        img_att.file.save("bivouac_stars.jpg", create_solid_image(600, 450, (15, 23, 42)), save=True)
        
        pdf_att = RichPostAttachment.objects.create(
            post=post, file_name="rando_guide.pdf", file_type="PDF",
            caption="Le guide de survie en bivouac", location="Semnoz"
        )
        pdf_att.file.save("rando_guide.pdf", create_solid_image(200, 200, (100, 100, 100)), save=True)

class Command(BaseCommand):
    help = "Seeds the database with highly realistic sample data for each feature"

    def handle(self, *args: tuple[Any], **options: dict[str, Any]) -> None:
        """Point d'entrée de la commande de seed de données."""
        self.stdout.write("Seeding database...")
        user_antoine, user_amani = seed_users_and_profiles()
        seed_events()
        seed_movies(user_antoine, user_amani)
        seed_games()
        seed_stargazing()
        seed_photos(user_antoine, user_amani)
        seed_social_posts(user_antoine, user_amani)
        seed_wishlist_items()
        seed_rich_posts(user_antoine, user_amani)
        self.stdout.write(self.style.SUCCESS("Database seeded successfully with beautiful mock data!"))
