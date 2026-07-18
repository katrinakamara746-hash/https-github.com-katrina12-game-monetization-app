from fastapi import APIRouter, HTTPException, status
import httpx
import random

router = APIRouter()

# Joke API endpoints
JOKE_APIS = [
    "https://api.api-ninjas.com/v1/jokes",  # API Ninjas
    "https://official-joke-api.appspot.com/random_joke",  # Official Joke API
    "https://v2.jokeapi.dev/joke/Any?type=single",  # JokeAPI
]


@router.get("/joke")
async def get_random_joke():
    """
    Get a random joke from external API
    Tries multiple joke APIs for reliability
    """
    for api_url in JOKE_APIS:
        try:
            async with httpx.AsyncClient() as client:
                headers = {}
                # Add API key for API Ninjas if available
                if "api-ninjas" in api_url:
                    import os
                    api_key = os.getenv("API_NINJAS_KEY")
                    if api_key:
                        headers["X-Api-Key"] = api_key
                    else:
                        continue  # Skip if no API key
                
                response = await client.get(api_url, headers=headers, timeout=5.0)
                response.raise_for_status()
                
                data = response.json()
                
                # Parse different API response formats
                if "api-ninjas" in api_url:
                    joke_text = data[0].get("joke", "No joke found")
                    return {
                        "joke": joke_text,
                        "source": "API Ninjas",
                        "category": "general"
                    }
                
                elif "official-joke-api" in api_url:
                    setup = data.get("setup", "")
                    punchline = data.get("punchline", "")
                    joke_type = data.get("type", "general")
                    return {
                        "joke": f"{setup}\n{punchline}",
                        "setup": setup,
                        "punchline": punchline,
                        "source": "Official Joke API",
                        "category": joke_type
                    }
                
                elif "jokeapi.dev" in api_url:
                    if data.get("type") == "single":
                        joke_text = data.get("joke", "No joke found")
                        return {
                            "joke": joke_text,
                            "source": "JokeAPI",
                            "category": data.get("category", "general")
                        }
                    else:
                        setup = data.get("setup", "")
                        delivery = data.get("delivery", "")
                        return {
                            "joke": f"{setup}\n{delivery}",
                            "setup": setup,
                            "punchline": delivery,
                            "source": "JokeAPI",
                            "category": data.get("category", "general")
                        }
        
        except Exception as e:
            continue
    
    # Fallback: return a local joke if all APIs fail
    return get_local_joke()


@router.get("/joke/category/{category}")
async def get_joke_by_category(category: str):
    """
    Get a joke by category
    Categories: general, knock-knock, programming, etc.
    """
    try:
        # Use JokeAPI which supports categories
        async with httpx.AsyncClient() as client:
            url = f"https://v2.jokeapi.dev/joke/{category}?type=single"
            response = await client.get(url, timeout=5.0)
            response.raise_for_status()
            
            data = response.json()
            
            if data.get("error"):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Invalid category: {category}"
                )
            
            if data.get("type") == "single":
                joke_text = data.get("joke", "No joke found")
            else:
                setup = data.get("setup", "")
                delivery = data.get("delivery", "")
                joke_text = f"{setup}\n{delivery}"
            
            return {
                "joke": joke_text,
                "category": data.get("category", category),
                "source": "JokeAPI"
            }
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch joke"
        )


@router.get("/joke/daily")
async def get_daily_joke():
    """
    Get the daily joke (same joke for all users on the same day)
    """
    from datetime import datetime
    
    # Use date as seed for consistent daily joke
    today = datetime.utcnow().date()
    random.seed(hash(str(today)))
    
    try:
        async with httpx.AsyncClient() as client:
            # Use Official Joke API
            response = await client.get(
                "https://official-joke-api.appspot.com/random_joke",
                timeout=5.0
            )
            response.raise_for_status()
            
            data = response.json()
            setup = data.get("setup", "")
            punchline = data.get("punchline", "")
            
            return {
                "joke": f"{setup}\n{punchline}",
                "setup": setup,
                "punchline": punchline,
                "date": str(today),
                "source": "Official Joke API",
                "message": "This is today's joke - same for all users"
            }
    
    except Exception:
        return get_local_joke()


@router.get("/jokes/batch")
async def get_multiple_jokes(count: int = 5):
    """
    Get multiple random jokes
    """
    if count < 1 or count > 20:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Count must be between 1 and 20"
        )
    
    jokes = []
    
    for _ in range(count):
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    "https://official-joke-api.appspot.com/random_joke",
                    timeout=5.0
                )
                response.raise_for_status()
                
                data = response.json()
                setup = data.get("setup", "")
                punchline = data.get("punchline", "")
                
                jokes.append({
                    "joke": f"{setup}\n{punchline}",
                    "setup": setup,
                    "punchline": punchline,
                    "type": data.get("type", "general")
                })
        
        except Exception:
            jokes.append(get_local_joke())
    
    return {"jokes": jokes, "count": len(jokes)}


def get_local_joke():
    """
    Fallback: Return a local joke when API fails
    """
    local_jokes = [
        {
            "setup": "Why do programmers prefer dark mode?",
            "punchline": "Because light attracts bugs!",
            "category": "programming"
        },
        {
            "setup": "How many programmers does it take to change a light bulb?",
            "punchline": "None, that's a hardware problem!",
            "category": "programming"
        },
        {
            "setup": "Why did the developer go broke?",
            "punchline": "Because he used up all his cache!",
            "category": "programming"
        },
        {
            "setup": "Why do Java developers wear glasses?",
            "punchline": "Because they don't C#!",
            "category": "programming"
        },
        {
            "setup": "What's a programmer's favorite hangout place?",
            "punchline": "Foo Bar!",
            "category": "programming"
        },
        {
            "setup": "Why did the game developer go to the beach?",
            "punchline": "To check out the new wave of graphics!",
            "category": "gaming"
        }
    ]
    
    joke = random.choice(local_jokes)
    return {
        "joke": f"{joke['setup']}\n{joke['punchline']}",
        "setup": joke["setup"],
        "punchline": joke["punchline"],
        "category": joke["category"],
        "source": "Local Fallback"
    }
