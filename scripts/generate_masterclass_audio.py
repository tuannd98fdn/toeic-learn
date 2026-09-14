import asyncio
import os
import edge_tts

AUDIO_DIR = os.path.join(os.getcwd(), 'public', 'audio', 'masterclass')
os.makedirs(AUDIO_DIR, exist_ok=True)

LESSONS = [
    {
        'id': 'csl_1_british_glottal',
        'voice': 'en-GB-RyanNeural',
        'text': 'The quarterly report is certainly not written yet.',
    },
    {
        'id': 'csl_2_american_flapped_t',
        'voice': 'en-US-JennyNeural',
        'text': 'Put it on the desk and meet us at eight.',
    },
    {
        'id': 'csl_3_australian_vowel_shift',
        'voice': 'en-AU-NatashaNeural',
        'text': 'The conference date has been changed to late May.',
    },
    {
        'id': 'csl_4_weak_forms_elision',
        'voice': 'en-US-JennyNeural',
        'text': 'He could have told her that we were going to arrive.',
    }
]

async def generate_audio():
    print("Generating Masterclass Studio Audio...")
    for lesson in LESSONS:
        # 1.0x Normal
        normal_path = os.path.join(AUDIO_DIR, f"{lesson['id']}_1x.mp3")
        comm_normal = edge_tts.Communicate(lesson['text'], lesson['voice'], rate="+0%")
        await comm_normal.save(normal_path)
        size_normal = os.path.getsize(normal_path)
        print(f"Generated 1.0x: {normal_path} ({size_normal} bytes)")

        # 0.75x Slow (Bóc tách âm)
        slow_path = os.path.join(AUDIO_DIR, f"{lesson['id']}_075x.mp3")
        comm_slow = edge_tts.Communicate(lesson['text'], lesson['voice'], rate="-25%")
        await comm_slow.save(slow_path)
        size_slow = os.path.getsize(slow_path)
        print(f"Generated 0.75x: {slow_path} ({size_slow} bytes)")

    print("All 8 audio files generated successfully!")

if __name__ == '__main__':
    asyncio.run(generate_audio())
