"use client";

export default function ContactLocation() {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Our Studio Location</h3>
      <div className="aspect-video overflow-hidden rounded-xl border border-border">
        <iframe
          className="w-full h-full"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.257766155255!2d-122.42172042456434!3d37.78310797198192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8ba535%3A0x42f72535075f1b67!2sUnion%20Square%2C%20San%20Francisco%2C%20CA%2094108%2C%20USA!5e0!3m2!1sen!2suk!4v1698246738944!5m2!1sen!2suk"
          style={{ border: 0 }}
        />
      </div>
    </div>
  );
}
