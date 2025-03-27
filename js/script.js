document.addEventListener('DOMContentLoaded', function() {
    // تهيئة المكونات عند تحميل صفحة DOM
    console.log('تم تحميل DOM، جاري تهيئة المكونات...');
    
    // Initialize hero slider
    initHeroSlider();
    
    // تهيئة عرض الألوان المميز في قسم الألوان
    initColorShowcase();
    
    // Initialize size selection
    initSizeSelection();
    
    // Initialize search functionality
    initProductSearch();
    
    // Initialize smooth scroll for navigation links
    initSmoothScroll();
    
    // Initialize order form functionality
    initOrderForm();
    
    // Initialize mobile menu functionality
    initMobileMenu();
    
    // Initialize header scroll effect
    initHeaderScrollEffect();
    
    // تهيئة معرض تفاصيل المنتج
    const gallerySection = document.querySelector('.product-details-gallery-section');
    if (gallerySection) {
        console.log('تم العثور على قسم المعرض، جاري التهيئة...');
        initProductGallery();
    } else {
        console.log('لم يتم العثور على قسم المعرض في الصفحة.');
    }
    
    // إضافة مستمعات أحداث إضافية
    addExtraEventListeners();
    
    // Initialize testimonials slider
    initTestimonialsSlider();
    
    // Initialize Enhanced Testimonials Section
    initEnhancedTestimonials();
    
    // تهيئة قسم التقييمات
    initReviewsGallery();
});

// دالة لإضافة مستمعات أحداث إضافية لعناصر الصفحة
function addExtraEventListeners() {
    console.log('إضافة مستمعات أحداث إضافية...');
    
    // استدعاء تهيئة الصور المصغرة للمنتج إذا كانت موجودة
    const thumbnailsContainer = document.getElementById('product-thumbnails');
    if (thumbnailsContainer) {
        console.log('تهيئة الصور المصغرة للمنتج...');
        initProductThumbnails();
    }
    
    // تهيئة اختيار لون المنتج إذا كانت الخيارات موجودة
    const colorOptions = document.querySelectorAll('.product-color-option');
    if (colorOptions.length > 0) {
        console.log('تهيئة اختيار لون المنتج...');
        initProductColorSelection();
    }
    
    // تهيئة أزرار التنقل بين صور المنتج إذا كانت موجودة
    const navButtons = document.querySelectorAll('.image-nav-btn');
    if (navButtons.length > 0) {
        console.log('تهيئة أزرار التنقل بين صور المنتج...');
        initProductImageNavigation();
    }
    
    // تهيئة اختيار اللون للموبايل إذا كانت الخيارات موجودة
    const mobileColorOptions = document.querySelectorAll('.mobile-color-option');
    if (mobileColorOptions.length > 0) {
        console.log('تهيئة اختيار اللون للموبايل...');
        initMobileColorSelection();
    }
    
    // تهيئة أزرار التنقل في معرض الصور
    const galleryNavButtons = document.querySelectorAll('.gallery-nav-button');
    if (galleryNavButtons.length > 0) {
        console.log('تهيئة أزرار التنقل في معرض الصور...');
        galleryNavButtons.forEach(button => {
            button.addEventListener('click', () => {
                const direction = button.classList.contains('prev') ? 'prev' : 'next';
                console.log(`تم النقر على زر ${direction} في المعرض`);
                navigateGallery(direction);
            });
        });
    }
    
    // تهيئة أزرار الألوان في معرض الصور
    const galleryColorOptions = document.querySelectorAll('.gallery-color-option');
    if (galleryColorOptions.length > 0) {
        console.log('تهيئة أزرار الألوان في معرض الصور...');
        galleryColorOptions.forEach(option => {
            option.addEventListener('click', () => {
                const color = option.dataset.color;
                console.log(`تم اختيار اللون ${color} في المعرض`);
                if (color && color !== galleryCurrentColor) {
                    galleryCurrentColor = color;
                    galleryCurrentImageIndex = 0;
                    
                    // تحديث واجهة المستخدم
                    updateGalleryColorSelection(color);
                    updateGalleryThumbnails(color);
                    updateGalleryMainImage(color, galleryCurrentImageIndex);
                    updateGalleryCounter(galleryCurrentImageIndex + 1, productGalleryImages[color].length);
                }
            });
        });
    }
}

// تسجيل حدث تحميل النافذة للتأكد من تحميل جميع الموارد (الصور)
window.addEventListener('load', function() {
    console.log('تم تحميل جميع موارد الصفحة بنجاح (بما في ذلك الصور)');
    
    // إعادة تهيئة معرض تفاصيل المنتج بعد تحميل جميع الموارد
    const gallerySection = document.querySelector('.product-details-gallery-section');
    if (gallerySection) {
        console.log('إعادة تهيئة المعرض بعد تحميل جميع الموارد...');
        
        // تحديث الصور المصغرة مرة أخرى للتأكد من تحميلها
        updateGalleryThumbnails(galleryCurrentColor);
        
        // إعادة تطبيق اللون الحالي
        updateGalleryColorSelection(galleryCurrentColor);
        
        // التأكد من تحديث الصورة الرئيسية
        updateGalleryMainImage(galleryCurrentColor, galleryCurrentImageIndex);
        
        // التأكد من تحديث العداد
        updateGalleryCounter(galleryCurrentImageIndex + 1, productGalleryImages[galleryCurrentColor].length);
    }
    
    // التأكد من تهيئة الصور المصغرة في قسم المنتج
    const productThumbnails = document.getElementById('product-thumbnails');
    if (productThumbnails) {
        const activeColorOption = document.querySelector('.product-color-option.active');
        if (activeColorOption) {
            const colorClass = activeColorOption.getAttribute('data-color');
            if (colorClass) {
                console.log('تحديث الصور المصغرة للمنتج بعد التحميل، اللون: ' + colorClass);
                updateProductThumbnails(colorClass);
            }
        }
    }
});

// Hero Slider Function
function initHeroSlider() {
    // Elements
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const progressBar = document.querySelector('.progress-bar');
    const quickFeatureBtn = document.querySelector('.scroll-to-features');
    
    // Variables
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 6000; // 6 seconds per slide
    const totalSlides = slides.length;
    
    // Initialize slider progress bar
    function updateProgressBar() {
        const progressPercent = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
    
    // Function to handle video slides
    function handleVideoSlides() {
        const currentVideo = slides[currentSlide].querySelector('.slide-video');
        const allVideos = document.querySelectorAll('.slide-video');
        
        // Pause all videos
        allVideos.forEach(video => {
            if (video && !video.paused) {
                video.pause();
            }
        });
        
        // Play current video if exists
        if (currentVideo && currentVideo.paused) {
            currentVideo.play().catch(err => {
                console.log('Video autoplay failed:', err);
            });
        }
    }
    
    // Initialize the slider
    function startSlider() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    function showSlide(n) {
        // Update slide index
        currentSlide = (n + totalSlides) % totalSlides;
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Update progress bar
        updateProgressBar();
        
        // Handle video slides
        handleVideoSlides();
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        stopSlider();
        nextSlide();
        startSlider();
    });
    
    prevBtn.addEventListener('click', () => {
        stopSlider();
        prevSlide();
        startSlider();
    });
    
    // Click on dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlider();
            showSlide(index);
            startSlider();
        });
    });
    
    // Mouse hover effects
    const sliderWrapper = document.querySelector('.hero-slider-wrapper');
    sliderWrapper.addEventListener('mouseenter', stopSlider);
    sliderWrapper.addEventListener('mouseleave', startSlider);
    
    // Scroll to features section
    if (quickFeatureBtn) {
        quickFeatureBtn.addEventListener('click', () => {
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Touch events for swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    sliderWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        // Right swipe (move to next slide in RTL layout)
        if (touchEndX < touchStartX - 50) {
            stopSlider();
            prevSlide();
            startSlider();
        }
        
        // Left swipe (move to previous slide in RTL layout)
        if (touchEndX > touchStartX + 50) {
            stopSlider();
            nextSlide();
            startSlider();
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            stopSlider();
            prevSlide(); // RTL layout
            startSlider();
        }
        
        if (e.key === 'ArrowLeft') {
            stopSlider();
            nextSlide(); // RTL layout
            startSlider();
        }
    });
    
    // Accessibility
    slides.forEach(slide => {
        slide.setAttribute('aria-hidden', 'true');
    });
    
    slides[currentSlide].setAttribute('aria-hidden', 'false');
    
    // Initialize slider
    showSlide(0);
    startSlider();
    
    // Add resize event listener
    window.addEventListener('resize', () => {
        // Reset any mobile-specific positioning
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            // Mobile-specific adjustments
            document.querySelectorAll('.slide-title, .slide-subtitle').forEach(el => {
                el.style.maxWidth = '100%';
            });
        } else {
            // Desktop adjustments
            document.querySelectorAll('.slide-title, .slide-subtitle').forEach(el => {
                el.style.maxWidth = '';
            });
        }
    });
}

/**
 * تهيئة عرض الألوان المميز في قسم الألوان
 */
function initColorShowcase() {
    console.log('تهيئة عرض الألوان المميز...');
    
    // الانتقال التلقائي بين خيارات الألوان
    let currentColorIndex = 0;
    const colorOptions = document.querySelectorAll('.premium-color-option');
    
    if (colorOptions.length === 0) {
        console.warn('لم يتم العثور على خيارات الألوان!');
        return;
    }
    
    let colorInterval;
    
    function startAutoSlide() {
        colorInterval = setInterval(() => {
            // إخفاء الخيار النشط الحالي
            colorOptions[currentColorIndex].classList.remove('active');
            
            // الانتقال إلى الخيار التالي
            currentColorIndex = (currentColorIndex + 1) % colorOptions.length;
            
            // إظهار الخيار الجديد
            colorOptions[currentColorIndex].classList.add('active');
            
            // تحديث لون المنتج المعروض
            const newColor = colorOptions[currentColorIndex].classList.contains('black') ? 'black' : 
                            colorOptions[currentColorIndex].classList.contains('white') ? 'white' : 'silver';
            
            updateProductColor(newColor);
            
        }, 5000); // تغيير كل 5 ثواني
    }
    
    function stopAutoSlide() {
        clearInterval(colorInterval);
    }
    
    // بدء العرض التلقائي
    startAutoSlide();
    
    // إيقاف العرض التلقائي عند تفاعل المستخدم
    colorOptions.forEach(option => {
        option.addEventListener('mouseenter', stopAutoSlide);
        
        option.addEventListener('click', () => {
            // إزالة الفئة النشطة من جميع الخيارات
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // إضافة الفئة النشطة للخيار المحدد
            option.classList.add('active');
            
            // تحديث الفهرس الحالي
            currentColorIndex = Array.from(colorOptions).indexOf(option);
            
            // تحديث لون المنتج المعروض
            const newColor = option.classList.contains('black') ? 'black' : 
                           option.classList.contains('white') ? 'white' : 'silver';
            
            updateProductColor(newColor);
        });
        
        // إعادة تشغيل العرض التلقائي عند مغادرة المؤشر
        option.addEventListener('mouseleave', startAutoSlide);
    });
}

function updateProductColor(colorClass) {
    console.log(`تحديث لون المنتج: ${colorClass}`); // للتشخيص

    // Update active color in all color selectors
    document.querySelectorAll('.color-dot, .color-option, .inline-color-option, .large-color-option, .premium-color-option, .product-color-option').forEach(option => {
        const optionColorClass = option.getAttribute('data-color');
            
        if (optionColorClass) {
            if (optionColorClass === colorClass) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        }
    });
    
    // Update main product image based on color
    const mainProductImage = document.querySelector('.main-product-image img, #main-product-img');
    if (mainProductImage) {
        // استخدام الصور المحددة لكل لون
        let imageName;
        switch(colorClass) {
            case 'black':
                imageName = '81lgw9AbveL._AC_SY741_.jpg';
                break;
            case 'white':
                imageName = '71ON0PEQBYL._AC_SY741_.jpg';
                break;
            case 'silver':
                imageName = '81RFcWem8OL._AC_SY741_.jpg';
                break;
        }
        mainProductImage.src = `Public/images/${colorClass}/${imageName}`;
        mainProductImage.alt = `طقم SOLY HUX باللون ${colorClass === 'black' ? 'الأسود' : colorClass === 'white' ? 'الأبيض' : 'الفضي'}`;
    }
    
    // Update premium color options display
    document.querySelectorAll('.premium-color-option').forEach(option => {
        const optionColorClass = Array.from(option.classList).find(c => 
            ['black', 'white', 'silver'].includes(c));
            
        if (optionColorClass === colorClass) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    // Update texture images based on color
    const textureImage = document.querySelector('.texture-image img');
    if (textureImage) {
        textureImage.src = `Public/images/${colorClass}/fabric.jpg`;
        textureImage.alt = `تفاصيل قماش الوافل ${colorClass === 'black' ? 'الأسود' : colorClass === 'white' ? 'الأبيض' : 'الفضي'}`;
    }
    
    // Update thumbnails
    updateProductThumbnails(colorClass);
}

/**
 * تهيئة الصور المصغرة في قسم تفاصيل المنتج
 */
function initProductThumbnails() {
    console.log('تهيئة الصور المصغرة للمنتج...');
    
    // البحث عن اللون النشط أو استخدام اللون الأبيض كافتراضي
    const activeColorOption = document.querySelector('.product-color-option.active');
    if (activeColorOption) {
        const colorClass = activeColorOption.getAttribute('data-color');
        if (colorClass) {
            console.log('تحديث الصور المصغرة باللون: ' + colorClass);
            updateProductThumbnails(colorClass);
        } else {
            console.log('لم يتم العثور على سمة اللون، استخدام اللون الأبيض كافتراضي');
            updateProductThumbnails('white');
        }
    } else {
        console.log('لا يوجد لون نشط، استخدام اللون الأبيض كافتراضي');
        updateProductThumbnails('white');
    }
}

/**
 * تحديث الصور المصغرة بناءً على اللون المحدد
 * @param {string} colorClass - اللون المحدد (black, white, silver)
 */
function updateProductThumbnails(colorClass) {
    console.log(`تحديث الصور المصغرة باللون: ${colorClass}`);
    
    const thumbnailsContainer = document.getElementById('product-thumbnails');
    if (!thumbnailsContainer) {
        console.error('حاوية الصور المصغرة غير موجودة!');
        return;
    }

    // تفريغ حاوية الصور المصغرة
    thumbnailsContainer.innerHTML = '';

    // تحديد مصادر الصور حسب اللون المحدد
    let thumbnailSources = [];
    let altTexts = [];

    switch (colorClass) {
        case 'black':
            thumbnailSources = [
                'Public/images/black/81lgw9AbveL._AC_SY741_.jpg',
                'Public/images/black/817G1mcCaYL._AC_SY741_.jpg',
                'Public/images/black/61KQP8EVJML._AC_SX679_.jpg',
                'Public/images/black/fabric.jpg',
                'Public/images/black/1.jpg',
                'Public/images/black/Exhibition _section_black.jpg' // تصحيح المسار مع مراعاة المسافة بعد Exhibition
            ];
            altTexts = [
                'طقم SOLY HUX أسود - العرض الأمامي',
                'طقم SOLY HUX أسود - العرض الخلفي',
                'طقم SOLY HUX أسود - تفاصيل الشورت',
                'قماش واقل أسود - تفاصيل القماش',
                'طقم SOLY HUX أسود - على الجسم',
                'طقم SOLY HUX أسود - القسم المعرضي'
            ];
            break;
        case 'white':
            thumbnailSources = [
                'Public/images/white/71ON0PEQBYL._AC_SY741_.jpg',
                'Public/images/white/71NEFQvFUZL._AC_SY741_.jpg',
                'Public/images/white/fabric.jpg',
                'Public/images/white/1.jpg',
                'Public/images/white/Exhibition_section_white.jpg'
            ];
            altTexts = [
                'طقم SOLY HUX أبيض - العرض الأمامي',
                'طقم SOLY HUX أبيض - العرض الخلفي',
                'قماش واقل أبيض - تفاصيل القماش',
                'طقم SOLY HUX أبيض - على الجسم',
                'طقم SOLY HUX أبيض - القسم المعرضي'
            ];
            break;
        case 'silver':
            thumbnailSources = [
                'Public/images/silver/81RFcWem8OL._AC_SY741_.jpg',
                'Public/images/silver/71FXFAPTHCL._AC_SX679_.jpg',
                'Public/images/silver/fabric.jpg',
                'Public/images/silver/Sleeveـdetails.jpg',
                'Public/images/silver/fabric_details.jpg',
                'Public/images/silver/1.jpg', 
                'Public/images/silver/Exhibition_section_silver.jpg'
            ];
            altTexts = [
                'طقم SOLY HUX فضي - العرض الأمامي',
                'طقم SOLY HUX فضي - العرض الخلفي',
                'قماش واقل فضي - تفاصيل القماش',
                'طقم SOLY HUX فضي - تفاصيل الأكمام',
                'طقم SOLY HUX فضي - تفاصيل النسيج',
                'طقم SOLY HUX فضي - على الجسم',
                'طقم SOLY HUX فضي - القسم المعرضي'
            ];
            break;
        default:
            console.warn(`اللون غير معروف: ${colorClass}، استخدام الأبيض كاحتياطي`);
            return updateProductThumbnails('white');
    }

    // إنشاء الصور المصغرة وإضافتها للحاوية
    thumbnailSources.forEach((src, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        if (index === 0) thumbnail.classList.add('active');
        
        thumbnail.innerHTML = `
            <div class="thumbnail-inner">
                <img src="${src}" alt="${altTexts[index] || 'صورة المنتج'}">
                <div class="thumbnail-overlay">
                    <span class="zoom-icon"><i class="fas fa-search-plus"></i></span>
                </div>
            </div>
        `;
        
        // إضافة استجابة النقر على الصورة المصغرة
        thumbnail.addEventListener('click', () => {
            console.log(`النقر على الصورة المصغرة ${index + 1}`);
            
            // تحديث الصورة الرئيسية
            const mainImg = document.getElementById('main-product-img');
            if (mainImg) {
                mainImg.src = src;
                mainImg.alt = altTexts[index] || 'صورة المنتج';
            } else {
                console.error('عنصر الصورة الرئيسية غير موجود!');
            }
            
            // تحديث حالة النشاط للصور المصغرة
            document.querySelectorAll('#product-thumbnails .thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            thumbnail.classList.add('active');
            
            // تحديث عداد الصور
            const currentCounter = document.getElementById('current-image');
            if (currentCounter) {
                currentCounter.textContent = index + 1;
            }
        });
        
        // إضافة الصورة المصغرة للحاوية
        thumbnailsContainer.appendChild(thumbnail);
    });
    
    // تحديث الصورة الرئيسية والعداد
    const mainImg = document.getElementById('main-product-img');
    if (mainImg && thumbnailSources.length > 0) {
        mainImg.src = thumbnailSources[0];
        mainImg.alt = altTexts[0] || 'صورة المنتج';
        
        // تحديث عداد الصور
        const currentCounter = document.getElementById('current-image');
        const totalCounter = document.getElementById('total-images');
        
        if (currentCounter) currentCounter.textContent = '1';
        if (totalCounter) totalCounter.textContent = thumbnailSources.length.toString();
    } else if (!mainImg) {
        console.error('عنصر الصورة الرئيسية غير موجود!');
    }
    
    console.log(`تم إنشاء ${thumbnailSources.length} صورة مصغرة`);
}

/**
 * تهيئة اختيار لون المنتج
 */
function initProductColorSelection() {
    console.log('تهيئة اختيار لون المنتج...');
    
    const colorOptions = document.querySelectorAll('.product-color-option');
    if (colorOptions.length === 0) {
        console.warn('لم يتم العثور على خيارات الألوان في الصفحة');
        return;
    }
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const colorClass = this.getAttribute('data-color');
            
            if (colorClass) {
                console.log(`اختيار اللون: ${colorClass}`);
                
                // إزالة الفئة النشطة من جميع الخيارات
                colorOptions.forEach(opt => {
                    opt.classList.remove('active');
                });
                
                // إضافة الفئة النشطة للخيار المحدد
                this.classList.add('active');
                
                // تحديث الصور المصغرة باللون الجديد
                updateProductThumbnails(colorClass);
                
                // تزامن حالة الألوان في جميع أنحاء الصفحة
                syncColorSelection(colorClass);
            }
        });
    });
}

/**
 * تزامن اختيار اللون في جميع أنحاء الصفحة
 * @param {string} colorClass - اللون المحدد
 */
function syncColorSelection(colorClass) {
    console.log(`مزامنة اختيار اللون: ${colorClass}`);
    
    // تحديث جميع أزرار اختيار اللون في الصفحة
    document.querySelectorAll('[data-color]').forEach(option => {
        if (option.getAttribute('data-color') === colorClass) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

function initSizeSelection() {
    const sizeButtons = document.querySelectorAll('.size-btn');
    
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sizeGroup = this.closest('.size-options-flex, .size-options');
            
            // إزالة الفئة النشطة من جميع الأزرار في نفس المجموعة
            sizeGroup.querySelectorAll('.size-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // إضافة الفئة النشطة للزر المضغوط
            this.classList.add('active');
            
            // تحديث العرض التقديمي للمنتج
            const productItem = this.closest('.product-item');
            if (productItem) {
                const size = this.getAttribute('data-size');
                const previewSize = productItem.querySelector('.product-preview-size');
                if (previewSize) {
                    previewSize.textContent = `المقاس: ${size}`;
                }
            }
        });
    });
}

/**
 * تهيئة أزرار التنقل بين صور المنتج
 */
function initProductImageNavigation() {
    console.log('تهيئة أزرار التنقل بين صور المنتج...');
    
    const prevBtn = document.querySelector('.image-nav-btn.prev');
    const nextBtn = document.querySelector('.image-nav-btn.next');
    
    if (!prevBtn || !nextBtn) {
        console.error('أزرار التنقل بين الصور غير موجودة!');
        return;
    }
    
    // التنقل للصورة السابقة
    prevBtn.addEventListener('click', () => {
        console.log('النقر على زر السابق');
        navigateProductImages('prev');
    });
    
    // التنقل للصورة التالية
    nextBtn.addEventListener('click', () => {
        console.log('النقر على زر التالي');
        navigateProductImages('next');
    });
}

/**
 * التنقل بين صور المنتج
 * @param {string} direction - اتجاه التنقل ('prev' أو 'next')
 */
function navigateProductImages(direction) {
    const thumbnails = document.querySelectorAll('#product-thumbnails .thumbnail');
    if (thumbnails.length === 0) {
        console.warn('لا توجد صور مصغرة للتنقل بينها');
        return;
    }
    
    const activeThumb = document.querySelector('#product-thumbnails .thumbnail.active');
    if (!activeThumb) {
        console.warn('لا توجد صورة نشطة، تنشيط الأولى');
        thumbnails[0].click();
        return;
    }
    
    let currentIndex = Array.from(thumbnails).indexOf(activeThumb);
    let targetIndex;
    
    if (direction === 'next') {
        targetIndex = (currentIndex + 1) % thumbnails.length;
    } else {
        targetIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    }
    
    console.log(`التنقل من الصورة ${currentIndex + 1} إلى ${targetIndex + 1}`);
    thumbnails[targetIndex].click();
    
    // تمرير الصورة إلى مكانها في العرض إذا كانت خارج نطاق الرؤية
    thumbnails[targetIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

function initSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // إغلاق القائمة المنسدلة للموبايل إذا كانت مفتوحة
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // تهيئة زر التمرير إلى ميزات المنتج
    const scrollToFeaturesButton = document.querySelector('.scroll-to-features');
    if (scrollToFeaturesButton) {
        scrollToFeaturesButton.addEventListener('click', () => {
            const featuresSection = document.getElementById('features-section');
            if (featuresSection) {
                featuresSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// دالة لتهيئة نموذج الطلب المتعدد
function initOrderForm() {
    let productCounter = 1;
    const colorImages = {
        'black': 'Public/images/black/81lgw9AbveL._AC_SY741_.jpg',
        'white': 'Public/images/white/71ON0PEQBYL._AC_SY741_.jpg',
        'silver': 'Public/images/silver/81RFcWem8OL._AC_SY741_.jpg'
    };
    
    // تحديد أسعار المنتج والخصومات
    const productPrices = {
        original: 900,
        sale: 699,
        discount2: 0.1, // خصم 10% عند شراء قطعتين
        discount3: 0.15 // خصم 15% عند شراء 3 قطع أو أكثر
    };
    
    // زر إضافة طقم آخر مع الخصم
    const addOutfitDiscountBtn = document.getElementById('addOutfitDiscountBtn');
    if (addOutfitDiscountBtn) {
        addOutfitDiscountBtn.addEventListener('click', function() {
            // تأثير نقر على الزر
            this.animate([
                { transform: 'scale(0.95)' },
                { transform: 'scale(1.05)' },
                { transform: 'scale(1)' }
            ], {
                duration: 300,
                easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
            });
            
            // إظهار تلميح للخصم
            showDiscountToast("تم تطبيق خصم 10% على طلبك!");
            
            // استدعاء دالة إضافة منتج جديد
            document.getElementById('addProductBtn').click();
            
            // تحديث الخصومات بعد إضافة المنتج الجديد
            setTimeout(() => {
                updateOrderSummary();
                
                // تأكيد على فئة الخصم المطبقة
                const discountTiers = document.querySelectorAll('.discount-tier');
                const tier = discountTiers[0]; // فئة الخصم للقطعتين
                
                tier.animate([
                    { background: 'linear-gradient(145deg, #f8f8f8, #ffffff)' },
                    { background: 'linear-gradient(145deg, rgba(var(--accent-color-rgb), 0.2), #ffffff)' },
                    { background: 'linear-gradient(145deg, #f8f8f8, #ffffff)' }
                ], {
                    duration: 1000,
                    iterations: 3
                });
                
                // تمرير لأسفل إلى المنتج الجديد بعد إضافته
                const products = document.querySelectorAll('.product-item');
                const lastProduct = products[products.length - 1];
                lastProduct.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 400);
        });
    }
    
    // زر إضافة الطقم الثالث
    const addThirdOutfitBtn = document.getElementById('addThirdOutfitBtn');
    if (addThirdOutfitBtn) {
        addThirdOutfitBtn.addEventListener('click', function() {
            // تأثير نقر على الزر
            this.animate([
                { transform: 'scale(0.95)' },
                { transform: 'scale(1.05)' },
                { transform: 'scale(1)' }
            ], {
                duration: 300,
                easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
            });
            
            // إظهار تلميح للخصم
            showDiscountToast("تم تطبيق خصم 15% على طلبك!", "#4CAF50");
            
            // استدعاء دالة إضافة منتج جديد
            document.getElementById('addProductBtn').click();
            
            // تحديث الخصومات بعد إضافة المنتج الجديد
            setTimeout(() => {
                updateOrderSummary();
                
                // تأكيد على فئة الخصم المطبقة
                const discountTiers = document.querySelectorAll('.discount-tier');
                const tier = discountTiers[1]; // فئة الخصم للثلاث قطع
                
                tier.animate([
                    { background: 'linear-gradient(145deg, #f8f8f8, #ffffff)' },
                    { background: 'linear-gradient(145deg, rgba(67, 160, 71, 0.2), #ffffff)' },
                    { background: 'linear-gradient(145deg, #f8f8f8, #ffffff)' }
                ], {
                    duration: 1000,
                    iterations: 3
                });
                
                // تمرير لأسفل إلى المنتج الجديد بعد إضافته
                const products = document.querySelectorAll('.product-item');
                const lastProduct = products[products.length - 1];
                lastProduct.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 400);
        });
    }
    
    // دالة إظهار تلميح الخصم
    function showDiscountToast(message, bgColor) {
        const discountToast = document.createElement('div');
        discountToast.className = 'discount-toast';
        discountToast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        
        if (bgColor) {
            discountToast.style.background = `linear-gradient(145deg, ${bgColor}, ${adjustBrightness(bgColor, -20)})`;
        }
        
        document.body.appendChild(discountToast);
        
        setTimeout(() => {
            discountToast.classList.add('show');
            
            setTimeout(() => {
                discountToast.classList.remove('show');
                setTimeout(() => {
                    discountToast.remove();
                }, 300);
            }, 2500);
        }, 100);
    }
    
    // دالة تعديل سطوع اللون
    function adjustBrightness(color, percent) {
        const R = parseInt(color.substring(1, 3), 16);
        const G = parseInt(color.substring(3, 5), 16);
        const B = parseInt(color.substring(5, 7), 16);

        const calculatedR = Math.max(Math.min(255, R + percent), 0);
        const calculatedG = Math.max(Math.min(255, G + percent), 0);
        const calculatedB = Math.max(Math.min(255, B + percent), 0);

        const RR = calculatedR.toString(16).padStart(2, '0');
        const GG = calculatedG.toString(16).padStart(2, '0');
        const BB = calculatedB.toString(16).padStart(2, '0');

        return `#${RR}${GG}${BB}`;
    }
    
    // إضافة منتج جديد للطلب مع تأثير حركي
    document.getElementById('addProductBtn').addEventListener('click', function() {
        productCounter++;
        
        // إنشاء عنصر المنتج الجديد
        const newProduct = document.createElement('div');
        newProduct.className = 'product-item';
        newProduct.dataset.productId = productCounter;
        newProduct.style.opacity = '0';
        newProduct.style.transform = 'translateY(20px)';
        
        // محتوى العنصر الجديد
        newProduct.innerHTML = `
            <div class="product-item-header">
                <h4 class="product-item-title">المنتج #${productCounter}</h4>
                <button type="button" class="remove-product-btn" data-product-id="${productCounter}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="product-item-options">
                <div class="product-color-selection">
                    <label class="form-label">اللون:</label>
                    <div class="product-color-options">
                        <div class="product-color-option black active" data-color="black">
                            <div class="color-swatch black"></div>
                            <span>أسود</span>
                        </div>
                        <div class="product-color-option white" data-color="white">
                            <div class="color-swatch white"></div>
                            <span>أبيض</span>
                        </div>
                        <div class="product-color-option silver" data-color="silver">
                            <div class="color-swatch silver"></div>
                            <span>فضي</span>
                        </div>
                    </div>
                </div>
                
                <div class="product-size-selection">
                    <label class="form-label">المقاس:</label>
                    <div class="size-options-flex">
                        <button type="button" class="size-btn" data-size="M">M</button>
                        <button type="button" class="size-btn active" data-size="L">L</button>
                        <button type="button" class="size-btn" data-size="XL">XL</button>
                        <button type="button" class="size-btn" data-size="2XL">2XL</button>
                        <button type="button" class="size-btn" data-size="3XL">3XL</button>
                    </div>
                </div>
                
                <div class="product-quantity">
                    <label class="form-label">الكمية:</label>
                    <div class="quantity-controls">
                        <button type="button" class="quantity-btn decrease">-</button>
                        <input type="number" class="product-qty" value="1" min="1" max="10" readonly>
                        <button type="button" class="quantity-btn increase">+</button>
                    </div>
                </div>
            </div>
            
            <div class="product-item-summary">
                <div class="product-preview">
                    <img src="${colorImages.black}" alt="طقم SOLY HUX أسود" class="product-preview-img">
                    <div class="product-preview-details">
                        <span class="product-preview-color">اللون: أسود</span>
                        <span class="product-preview-size">المقاس: L</span>
                        <span class="product-preview-qty">الكمية: 1</span>
                    </div>
                </div>
                <div class="product-price">
                    <span class="item-price">${productPrices.sale} ج.م</span>
                </div>
            </div>
        `;
        
        // إضافة العنصر للصفحة
        document.getElementById('selectedProductsContainer').appendChild(newProduct);
        
        // إضافة تأثير حركي (animation) للعنصر الجديد
        setTimeout(() => {
            newProduct.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            newProduct.style.opacity = '1';
            newProduct.style.transform = 'translateY(0)';
        }, 10);
        
        // تفعيل الأزرار في العنصر الجديد
        attachProductEvents(newProduct);
        
        // تحديث رؤية زر الحذف في المنتج الأول
        updateRemoveButtonVisibility();
        
        // تحديث إجمالي الطلب
        updateOrderSummary();
        
        // تحديث رؤية أزرار إضافة الأطقم الإضافية
        updateAddOutfitButtons();
    });
    
    // إضافة أحداث للمنتج الأول
    const firstProduct = document.querySelector('.product-item');
    if (firstProduct) {
        attachProductEvents(firstProduct);
    }
    
    // تحديث رؤية زر الحذف في المنتج الأول وأزرار إضافة الأطقم
    updateRemoveButtonVisibility();
    updateAddOutfitButtons();
    
    // تحديث رؤية أزرار إضافة الأطقم الإضافية
    function updateAddOutfitButtons() {
        const products = document.querySelectorAll('.product-item');
        const addOutfitDiscountBtn = document.getElementById('addOutfitDiscountBtn');
        const addThirdOutfitBtn = document.getElementById('addThirdOutfitBtn');
        
        // التحكم في ظهور زر المنتج الثاني
        if (addOutfitDiscountBtn) {
            const secondOutfitContainer = addOutfitDiscountBtn.parentElement;
            
            if (products.length === 1) {
                secondOutfitContainer.style.display = 'flex';
                
                // تأثير حركي لتلميح الخصم
                const discountText = addOutfitDiscountBtn.querySelector('.discount-text');
                discountText.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.08)' },
                    { transform: 'scale(1)' }
                ], {
                    duration: 1500,
                    iterations: 2
                });
            } else {
                secondOutfitContainer.style.display = 'none';
            }
        }
        
        // التحكم في ظهور زر المنتج الثالث
        if (addThirdOutfitBtn) {
            const thirdOutfitContainer = addThirdOutfitBtn.parentElement;
            
            if (products.length === 2) {
                thirdOutfitContainer.style.display = 'flex';
                
                // تأثير حركي لتلميح الخصم
                const discountText = addThirdOutfitBtn.querySelector('.discount-text');
                discountText.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.08)' },
                    { transform: 'scale(1)' }
                ], {
                    duration: 1500,
                    iterations: 2
                });
            } else {
                thirdOutfitContainer.style.display = 'none';
            }
        }
    }
    
    // دالة إرفاق أحداث للمنتج
    function attachProductEvents(productElement) {
        // اختيار اللون مع تأثيرات متقدمة
        const colorOptions = productElement.querySelectorAll('.product-color-option');
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                // إزالة الفئة النشطة من جميع الخيارات مع تأثير حركي
                colorOptions.forEach(opt => {
                    if (opt.classList.contains('active')) {
                        opt.classList.add('fading-out');
                        setTimeout(() => {
                            opt.classList.remove('active');
                            opt.classList.remove('fading-out');
                        }, 150);
                    }
                });
                
                // إضافة الفئة النشطة للخيار المحدد مع تأثير حركي
                this.classList.add('active');
                const colorSwatch = this.querySelector('.color-swatch');
                colorSwatch.animate([
                    { transform: 'scale(0.8)' },
                    { transform: 'scale(1.2)' },
                    { transform: 'scale(1.15)' }
                ], {
                    duration: 300,
                    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                });
                
                const color = this.dataset.color;
                
                // تحديث صورة المنتج المعروضة مع تأثير تلاشي
                const previewImg = productElement.querySelector('.product-preview-img');
                previewImg.style.opacity = '0';
                setTimeout(() => {
                    previewImg.src = colorImages[color];
                    previewImg.style.opacity = '1';
                }, 200);
                
                // تحديث تفاصيل المنتج
                const colorName = productElement.querySelector('.product-preview-color');
                colorName.textContent = `اللون: ${getColorName(color)}`;
                colorName.animate([
                    { opacity: 0, transform: 'translateY(-5px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], {
                    duration: 300,
                    easing: 'ease-out'
                });
            });
        });
        
        // حذف المنتج مع تأثير حركي
        const removeBtn = productElement.querySelector('.remove-product-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                productElement.style.transition = 'all 0.5s ease';
                productElement.style.opacity = '0';
                productElement.style.transform = 'translateX(30px)';
                productElement.style.overflow = 'hidden';
                
                setTimeout(() => {
                    productElement.style.maxHeight = '0';
                    productElement.style.margin = '0';
                    productElement.style.padding = '0';
                    
                    setTimeout(() => {
                        productElement.remove();
                        
                        // تحديث رؤية زر الحذف في المنتج الأول
                        updateRemoveButtonVisibility();
                        
                        // تحديث إجمالي الطلب
                        updateOrderSummary();
                        
                        // تحديث رؤية أزرار إضافة الأطقم الإضافية
                        updateAddOutfitButtons();
                    }, 300);
                }, 300);
            });
        }
    }
    
    // تحديث رؤية زر الحذف في المنتج الأول
    function updateRemoveButtonVisibility() {
        const products = document.querySelectorAll('.product-item');
        if (products.length === 1) {
            products[0].querySelector('.remove-product-btn').style.display = 'none';
        } else {
            products.forEach(product => {
                product.querySelector('.remove-product-btn').style.display = 'flex';
            });
        }
    }
    
    // تحديث ملخص الطلب وإجمالي السعر مع تأثيرات حركية
    function updateOrderSummary() {
        const products = document.querySelectorAll('.product-item');
        let totalItems = 0;
        let totalPrice = 0;
        
        // حساب العدد الإجمالي للمنتجات والسعر
        products.forEach(product => {
            const qty = parseInt(product.querySelector('.product-qty').value);
            totalItems += qty;
            totalPrice += productPrices.sale * qty;
        });
        
        // تطبيق الخصومات حسب العدد
        let discountPercentage = 0;
        let discountAmount = 0;
        
        if (totalItems >= 3) {
            discountPercentage = productPrices.discount3;
        } else if (totalItems === 2) {
            discountPercentage = productPrices.discount2;
        }
        
        // حساب الخصم والسعر النهائي
        discountAmount = totalPrice * discountPercentage;
        const finalPrice = totalPrice - discountAmount;
        
        // تحديث العناصر في الواجهة مع تأثيرات حركية
        animateCounterUpdate('totalItems', totalItems);
        
        // تحديث السعر الأصلي
        const originalTotalPrice = document.querySelector('.original-total-price');
        animateTextUpdate(originalTotalPrice, `${Math.round(totalItems * productPrices.original)} ج.م`);
        
        // تحديث قيمة الخصم
        const discountValue = document.querySelector('.discount-value');
        const totalDiscount = (totalItems * productPrices.original) - finalPrice;
        const discountPercent = Math.round((totalDiscount / (totalItems * productPrices.original)) * 100);
        animateTextUpdate(discountValue, `${Math.round(totalDiscount)} ج.م (${discountPercent}%)`);
        
        // تحديث السعر الإجمالي
        const totalPriceElement = document.getElementById('totalPrice');
        animateTextUpdate(totalPriceElement, `${Math.round(finalPrice)} ج.م`);
        
        // تسليط الضوء على فئات الخصم المطبقة
        highlightApplicableDiscountTier(totalItems);
    }
    
    // تحريك تأثير تحديث النص
    function animateTextUpdate(element, newText) {
        element.animate([
            { opacity: 1 },
            { opacity: 0, transform: 'translateY(-10px)' }
        ], {
            duration: 200,
            easing: 'ease-out',
            fill: 'forwards'
        }).onfinish = () => {
            element.textContent = newText;
            element.animate([
                { opacity: 0, transform: 'translateY(10px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], {
                duration: 200,
                easing: 'ease-out',
                fill: 'forwards'
            });
        };
    }
    
    // تحريك تأثير تحديث العداد
    function animateCounterUpdate(elementId, newValue) {
        const element = document.getElementById(elementId);
        const currentValue = parseInt(element.textContent);
        const increment = newValue > currentValue ? 1 : -1;
        let currentCount = currentValue;
        
        const intervalId = setInterval(() => {
            if (currentCount === newValue) {
                clearInterval(intervalId);
                return;
            }
            
            currentCount += increment;
            element.textContent = currentCount;
            
            element.animate([
                { transform: 'scale(1.3)' },
                { transform: 'scale(1)' }
            ], {
                duration: 200,
                easing: 'ease-out'
            });
        }, 100);
    }
    
    // تسليط الضوء على فئة الخصم المطبقة
    function highlightApplicableDiscountTier(totalItems) {
        const discountTiers = document.querySelectorAll('.discount-tier');
        
        discountTiers.forEach((tier, index) => {
            // إزالة التأثير من جميع الفئات
            tier.style.transition = 'all 0.3s ease';
            tier.style.background = '';
            tier.style.borderRight = '';
            tier.style.transform = '';
            tier.style.boxShadow = '';
            
            // إضافة التأثير للفئة المطبقة
            if ((index === 0 && totalItems === 2) || (index === 1 && totalItems >= 3)) {
                tier.style.background = 'linear-gradient(145deg, #f8f8f8, #ffffff)';
                tier.style.borderRight = '4px solid var(--accent-color)';
                tier.style.transform = 'translateX(-5px)';
                tier.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.05)';
                
                // تأثير وميض
                tier.animate([
                    { background: 'linear-gradient(145deg, #f8f8f8, #ffffff)' },
                    { background: 'linear-gradient(145deg, rgba(var(--accent-color-rgb), 0.1), #ffffff)' },
                    { background: 'linear-gradient(145deg, #f8f8f8, #ffffff)' }
                ], {
                    duration: 1000,
                    iterations: 3
                });
            }
        });
    }
    
    // الحصول على اسم اللون بالعربية
    function getColorName(color) {
        const colorNames = {
            'black': 'أسود',
            'white': 'أبيض',
            'silver': 'فضي'
        };
        return colorNames[color] || color;
    }
    
    // تقديم النموذج مع تأثيرات متقدمة وإرسال البيانات إلى SheetDB
    document.getElementById('codOrderForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // التحقق من صحة البيانات قبل الإرسال
        if (!validateOrderForm()) {
            return;
        }
        
        // تأثير تحميل على زر الطلب
        const submitBtn = document.querySelector('.order-submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري تقديم الطلب...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.8';
        
        // جمع بيانات المنتجات
        const products = [];
        document.querySelectorAll('.product-item').forEach(product => {
            const color = product.querySelector('.product-color-option.active').dataset.color;
            const size = product.querySelector('.size-btn.active').dataset.size;
            const qty = parseInt(product.querySelector('.product-qty').value);
            
            products.push({
                color: color,
                size: size,
                quantity: qty
            });
        });
        
        // جمع بيانات العميل
        const customerData = {
            name: document.getElementById('fullName').value,
            mobile: document.getElementById('mobileNumber').value,
            governorate: document.getElementById('governorate').value,
            address: document.getElementById('detailedAddress').value,
            notes: document.getElementById('orderNotes').value || "لا توجد ملاحظات"
        };
        
        // إنشاء رقم طلب عشوائي
        const orderNumber = generateOrderNumber();
        
        // إعداد البيانات للإرسال
        const formData = {
            order_number: orderNumber,
            customer_name: customerData.name,
            customer_mobile: customerData.mobile,
            customer_address: `${customerData.governorate} - ${customerData.address}`,
            order_notes: customerData.notes,
            product_details: JSON.stringify(products),
            total_items: document.getElementById('totalItems').textContent,
            total_price: document.getElementById('totalPrice').textContent,
            order_date: new Date().toISOString()
        };
        
        // إرسال البيانات إلى Google Apps Script
        submitFormToGoogleSheet(formData, orderNumber, submitBtn, originalBtnText);
    });
    
    // دالة لإرسال البيانات إلى Google Sheet عبر Make.com
    function submitFormToGoogleSheet(formData, orderNumber, submitBtn, originalBtnText) {
        // تجهيز البيانات بتنسيق جديد لـ Make.com (تنسيق أبسط)
        const makeData = {
            orderNumber: formData.order_number,
            customerName: formData.customer_name,
            customerMobile: formData.customer_mobile,
            customerAddress: formData.customer_address,
            orderNotes: formData.order_notes,
            productDetails: formData.product_details,
            totalItems: formData.total_items,
            totalPrice: formData.total_price,
            orderDate: formData.order_date
        };
        
        console.log('جاري إرسال البيانات إلى Make.com:', makeData);
        
        // تجهيز الاستدعاء إلى Make.com لإضافة البيانات إلى جدول البيانات
        fetch('https://hook.eu2.make.com/gewvhrklm87g7btbc6jqz7hb7fdsrigh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(makeData)
        })
        .then(response => {
            console.log('استجابة Make.com:', response);
            if (!response.ok) {
                throw new Error('فشل في الاتصال بـ Make.com: ' + response.status);
            }
            return response.text();
        })
        .then(data => {
            console.log('تم إرسال البيانات بنجاح إلى Make.com:', data);
            processSuccessfulOrder(orderNumber, submitBtn, originalBtnText);
            
            // إرسال بيانات مباشرة إلى Google Sheet كاحتياط
            directSendToGoogleSheet(makeData);
        })
        .catch(error => {
            console.error('حدث خطأ أثناء الإرسال إلى Make.com:', error);
            
            // إرسال البيانات مباشرة إلى Google Sheet
            directSendToGoogleSheet(makeData);
            
            // محاولة بديلة عبر نافذة منبثقة (كحل احتياطي)
            const params = new URLSearchParams();
            Object.keys(makeData).forEach(key => {
                params.append(key, makeData[key]);
            });
            
            try {
                const popupWindow = window.open(
                    'https://hook.eu2.make.com/gewvhrklm87g7btbc6jqz7hb7fdsrigh?' + params.toString(), 
                    'orderSubmission', 
                    'width=1,height=1,left=-100,top=-100'
                );
                
                setTimeout(() => {
                    if (popupWindow) {
                        popupWindow.close();
                    }
                }, 3000);
            } catch (e) {
                console.error('فشل في فتح النافذة المنبثقة:', e);
            }
            
            // حفظ البيانات محلياً
            saveOrderLocally(orderNumber, makeData);
            
            // إظهار رسالة نجاح للمستخدم بغض النظر عن الخطأ
            processSuccessfulOrder(orderNumber, submitBtn, originalBtnText);
        });
    }
    
    // دالة لإرسال البيانات مباشرة إلى Google Sheet
    function directSendToGoogleSheet(data) {
        // إرسال البيانات مباشرة إلى نموذج Google (مرتبط بجدول بيانات)
        try {
            const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScPUsPqdhhCcC0cXzHxFMIYfNSKnybGrQLlGo7f88rkQ78RiA/formResponse';
            
            // ملاحظة: استبدل أرقام entry.XX بالأرقام الصحيحة من نموذج Google الخاص بك
            const formData = new URLSearchParams();
            formData.append('entry.540222458', data.orderNumber || '');
            formData.append('entry.1316818601', data.customerName || '');
            formData.append('entry.733922398', data.customerMobile || '');
            formData.append('entry.1644677684', data.customerAddress || '');
            formData.append('entry.747613571', data.orderNotes || '');
            formData.append('entry.1438099102', data.productDetails || '');
            formData.append('entry.1095859317', data.totalItems || '');
            formData.append('entry.1555536045', data.totalPrice || '');
            formData.append('entry.1333578160', data.orderDate || new Date().toISOString());
            
            console.log('إرسال البيانات مباشرة إلى Google Form:', googleFormUrl);
            
            fetch(googleFormUrl + '?' + formData.toString(), {
                method: 'GET',
                mode: 'no-cors'
            }).then(() => {
                console.log('تم إرسال البيانات بنجاح إلى Google Form');
            }).catch(err => {
                console.error('فشل في إرسال البيانات إلى Google Form:', err);
            });
        } catch (e) {
            console.error('خطأ في دالة directSendToGoogleSheet:', e);
        }
    }
    
    // إضافة كود Webhook بديل لمزيد من الموثوقية
    function backupSendToWebhook(formData) {
        // يمكنك إضافة خدمة webhook بديلة هنا إذا كنت ترغب في مزيد من الموثوقية
        // مثل make.com أو zapier أو integromat
        console.log('نسخة احتياطية للبيانات:', formData);
        
        // يمكنك تفعيل هذا الكود لاستخدام webhook خارجي
        /* 
        fetch('https://hook.eu1.make.com/YOUR_WEBHOOK_ID_HERE', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).catch(err => console.log('خطأ في إرسال البيانات الاحتياطية:', err));
        */
    }
    
    // دالة لمعالجة الطلب الناجح
    function processSuccessfulOrder(orderNumber, submitBtn, originalBtnText) {
        // إظهار موديل تأكيد الطلب
        document.getElementById('orderNumber').textContent = orderNumber;
        
        // استعادة زر الطلب للحالة الطبيعية
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        
        // عرض الموديل مع تأثير ظهور تدريجي
        const successModal = document.getElementById('successModal');
        successModal.style.display = 'block';
        
        const modalContent = successModal.querySelector('.modal-content');
        modalContent.animate([
            { opacity: 0, transform: 'scale(0.8)' },
            { opacity: 1, transform: 'scale(1)' }
        ], {
            duration: 400,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
    }
    
    // دالة لحفظ البيانات محليًا
    function saveOrderLocally(orderNumber, orderData) {
        try {
            // حفظ البيانات في التخزين المحلي
            const savedOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
            savedOrders.push(orderData);
            localStorage.setItem('pendingOrders', JSON.stringify(savedOrders));
            
            // محاولة إرسال الطلبات المعلقة عند استعادة الاتصال
            window.addEventListener('online', function() {
                trySubmitPendingOrders();
            });
            
            console.log('تم حفظ الطلب محليًا بنجاح برقم:', orderNumber);
        } catch (err) {
            console.error('فشل في حفظ الطلب محليًا:', err);
        }
    }
    
    // دالة لمحاولة إرسال الطلبات المعلقة
    function trySubmitPendingOrders() {
        try {
            const pendingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
            if (pendingOrders.length === 0) return;
            
            console.log('محاولة إرسال الطلبات المعلقة. العدد:', pendingOrders.length);
            
            // إرسال الطلبات المعلقة واحدًا تلو الآخر
            const promises = pendingOrders.map(order => 
                fetch('https://sheetdb.io/api/v1/hg0a1kjbvildb', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ data: order })
                }).catch(err => console.error('فشل في إرسال طلب معلق:', err))
            );
            
            Promise.allSettled(promises).then(results => {
                // عد النجاحات
                const successCount = results.filter(r => r.status === 'fulfilled').length;
                if (successCount > 0) {
                    console.log(`تم إرسال ${successCount} من الطلبات المعلقة بنجاح`);
                    localStorage.removeItem('pendingOrders');
                }
            });
        } catch (err) {
            console.error('فشل في معالجة الطلبات المعلقة:', err);
        }
    }
    
    // دالة إغلاق موديل نجاح الطلب
    window.closeSuccessModal = function() {
        const successModal = document.getElementById('successModal');
        const modalContent = successModal.querySelector('.modal-content');
        
        modalContent.animate([
            { opacity: 1, transform: 'scale(1)' },
            { opacity: 0, transform: 'scale(0.8)' }
        ], {
            duration: 300,
            easing: 'ease-out'
        }).onfinish = () => {
            successModal.style.display = 'none';
            
            // إعادة تعيين النموذج بعد نجاح الطلب
            document.getElementById('codOrderForm').reset();
            
            // إزالة جميع المنتجات باستثناء المنتج الأول
            const products = document.querySelectorAll('.product-item');
            for (let i = 1; i < products.length; i++) {
                products[i].remove();
            }
            
            // إعادة تعيين المنتج الأول إلى الحالة الافتراضية
            const firstProduct = document.querySelector('.product-item');
            if (firstProduct) {
                // إعادة تعيين اللون
                const colorOptions = firstProduct.querySelectorAll('.product-color-option');
                colorOptions.forEach(opt => opt.classList.remove('active'));
                firstProduct.querySelector('.product-color-option.black').classList.add('active');
                
                // إعادة تعيين المقاس
                const sizeButtons = firstProduct.querySelectorAll('.size-btn');
                sizeButtons.forEach(btn => btn.classList.remove('active'));
                firstProduct.querySelector('.size-btn[data-size="L"]').classList.add('active');
                
                // إعادة تعيين الكمية
                firstProduct.querySelector('.product-qty').value = '1';
                
                // إعادة تعيين التفاصيل
                firstProduct.querySelector('.product-preview-img').src = colorImages.black;
                firstProduct.querySelector('.product-preview-color').textContent = 'اللون: أسود';
                firstProduct.querySelector('.product-preview-size').textContent = 'المقاس: L';
                firstProduct.querySelector('.product-preview-qty').textContent = 'الكمية: 1';
                firstProduct.querySelector('.item-price').textContent = `${productPrices.sale} ج.م`;
            }
            
            // تحديث ملخص الطلب
            updateOrderSummary();
            
            // تحديث رؤية الأزرار
            updateRemoveButtonVisibility();
            updateAddOutfitButtons();
        };
    };
    
    // دالة إنشاء رقم طلب عشوائي
    function generateOrderNumber() {
        const prefix = 'SO';
        const randomPart = Math.floor(10000 + Math.random() * 90000);
        const date = new Date();
        const datePart = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear().toString().substr(-2)}`;
        return `${prefix}${datePart}-${randomPart}`;
    }

    // دالة للتحقق من صحة بيانات النموذج
    function validateOrderForm() {
        // التحقق من وجود منتج واحد على الأقل
        const products = document.querySelectorAll('.product-item');
        if (products.length === 0) {
            alert('يرجى إضافة منتج واحد على الأقل للطلب');
            return false;
        }
        
        // التحقق من اسم العميل
        const nameField = document.getElementById('fullName');
        if (!nameField.value || nameField.value.trim().length < 3) {
            alert('يرجى إدخال الاسم الكامل بشكل صحيح (3 أحرف على الأقل)');
            nameField.focus();
            return false;
        }
        
        // التحقق من رقم الهاتف
        const mobileField = document.getElementById('mobileNumber');
        const mobilePattern = /^01[0125][0-9]{8}$/;
        if (!mobilePattern.test(mobileField.value)) {
            alert('يرجى إدخال رقم هاتف صحيح مكون من 11 رقم ويبدأ بـ 01');
            mobileField.focus();
            return false;
        }
        
        // التحقق من المحافظة
        const governorate = document.getElementById('governorate');
        if (governorate.value === '') {
            alert('يرجى اختيار المحافظة');
            governorate.focus();
            return false;
        }
        
        // التحقق من العنوان التفصيلي
        const addressField = document.getElementById('detailedAddress');
        if (!addressField.value || addressField.value.trim().length < 5) {
            alert('يرجى إدخال العنوان التفصيلي بشكل صحيح');
            addressField.focus();
            return false;
        }
        
        return true;
    }
}

// تهيئة اختيار اللون للموبايل
function initMobileColorSelection() {
    const mobileColorOptions = document.querySelectorAll('.mobile-color-option');
    
    mobileColorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع الخيارات
            mobileColorOptions.forEach(opt => opt.classList.remove('active'));
            
            // إضافة الفئة النشطة للخيار المحدد
            this.classList.add('active');
            
            // الحصول على لون المنتج المحدد
            const colorClass = this.getAttribute('data-color');
            
            if (colorClass) {
                // تحديث المنتج بناءً على اللون المختار
                updateProductColor(colorClass);
                
                // تزامن مع اختيارات اللون الأخرى في الصفحة
                syncColorSelection(colorClass);
                
                // إعادة تعيين مؤشر الصورة الحالية
                const currentCounter = document.getElementById('current-image');
                if (currentCounter) currentCounter.textContent = "1";
            }
        });
    });
}

// دالة مبسطة لاختيار الألوان
function initSimpleColorSelection() {
    console.log('تهيئة اختيار الألوان...');
    
    const colorOptions = document.querySelectorAll('.product-color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const colorClass = this.getAttribute('data-color');
            
            if (colorClass) {
                console.log(`اختيار اللون: ${colorClass}`);
                
                // إزالة الفئة النشطة من جميع الخيارات
                colorOptions.forEach(opt => {
                    opt.classList.remove('active');
                });
                
                // إضافة الفئة النشطة للخيار المحدد
                this.classList.add('active');
                
                // تحديث الصور المصغرة باللون الجديد
                updateProductThumbnails(colorClass);
            }
        });
    });
}

// تهيئة البحث في المنتج
function initProductSearch() {
    const searchInput = document.getElementById('productSearch');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    function clearHighlights() {
        const highlighted = document.querySelectorAll('.highlight-match');
        highlighted.forEach(el => {
            el.classList.remove('highlight-match');
        });
    }
    
    function highlightMatches(query) {
        // توضيح النتائج في نص الصفحة
        const contentSections = document.querySelectorAll('.feature p, .scenario p, .product-description, .section-description');
        
        clearHighlights();
        
        if (query.length < 3) return;
        
        contentSections.forEach(section => {
            const content = section.innerHTML;
            if (content.toLowerCase().includes(query.toLowerCase())) {
                section.classList.add('highlight-match');
                
                // التمرير إلى أول نتيجة
                const firstMatch = document.querySelector('.highlight-match');
                if (firstMatch) {
                    firstMatch.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
    }
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        highlightMatches(query);
    });
}

// Scroll to order form
function scrollToOrderForm() {
    const orderFormSection = document.getElementById('order-form');
    if (orderFormSection) {
        orderFormSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Open size chart
function openSizeChart() {
    const sizeChartModal = document.getElementById('sizeChartModal');
    if (sizeChartModal) {
        sizeChartModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close size chart
function closeSizeChart() {
    const sizeChartModal = document.getElementById('sizeChartModal');
    if (sizeChartModal) {
        sizeChartModal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Header Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
        
        // Close mobile menu on link clicks
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.querySelector('i').classList.add('fa-bars');
                mobileMenuToggle.querySelector('i').classList.remove('fa-times');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target) && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.querySelector('i').classList.add('fa-bars');
                mobileMenuToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    }
}

// Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.main-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow and shrink effect on scroll
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Order Button Click Event
document.querySelectorAll('.header-order-btn, .mobile-order-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const orderSection = document.querySelector('#order-form');
        if (orderSection) {
            orderSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/**
 * مصفوفات الصور لكل لون
 * تحتوي على مسارات الصور لكل لون من ألوان المنتج
 */
const productGalleryImages = {
    black: [
        'Public/images/black/81lgw9AbveL._AC_SY741_.jpg',
        'Public/images/black/817G1mcCaYL._AC_SY741_.jpg',
        'Public/images/black/61KQP8EVJML._AC_SX679_.jpg',
        'Public/images/black/fabric.jpg',
        'Public/images/black/1.jpg',
        'Public/images/black/Exhibition _section_black.jpg' // تصحيح المسار مع مراعاة المسافة بعد Exhibition
    ],
    white: [
        'Public/images/white/71ON0PEQBYL._AC_SY741_.jpg',
        'Public/images/white/71NEFQvFUZL._AC_SY741_.jpg',
        'Public/images/white/fabric.jpg',
        'Public/images/white/1.jpg',
        'Public/images/white/Exhibition_section_white.jpg'
    ],
    silver: [
        'Public/images/silver/81RFcWem8OL._AC_SY741_.jpg',
        'Public/images/silver/71FXFAPTHCL._AC_SX679_.jpg',
        'Public/images/silver/fabric.jpg',
        'Public/images/silver/Sleeveـdetails.jpg',
        'Public/images/silver/fabric_details.jpg',
        'Public/images/silver/1.jpg', 
        'Public/images/silver/Exhibition_section_silver.jpg'
    ]
};

// متغيرات عالمية لتتبع حالة المعرض
let galleryCurrentColor = 'black';
let galleryCurrentImageIndex = 0;

/**
 * تهيئة معرض صور المنتج
 * تقوم هذه الدالة بإعداد معرض الصور وتسجيل كل مستمعي الأحداث اللازمة
 */
function initProductGallery() {
    console.log('تهيئة معرض صور المنتج...');
    
    const gallerySection = document.querySelector('.product-details-gallery-section');
    if (!gallerySection) {
        console.error('لم يتم العثور على قسم معرض الصور!');
        return;
    }

    // تحديث الصور المصغرة والصورة الرئيسية للون الافتراضي
    updateGalleryThumbnails(galleryCurrentColor);
    updateGalleryMainImage(galleryCurrentColor, galleryCurrentImageIndex);
    updateGalleryCounter(galleryCurrentImageIndex + 1, productGalleryImages[galleryCurrentColor].length);

    // إضافة مستمعي الأحداث لأزرار التنقل
    const prevButton = gallerySection.querySelector('.gallery-nav-button.prev');
    const nextButton = gallerySection.querySelector('.gallery-nav-button.next');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            console.log('تم النقر على زر السابق');
            navigateGallery('prev');
        });
        
        nextButton.addEventListener('click', () => {
            console.log('تم النقر على زر التالي');
            navigateGallery('next');
        });
    } else {
        console.warn('لم يتم العثور على أزرار التنقل في المعرض!');
    }

    // إضافة مستمعي الأحداث لأزرار الألوان
    const colorOptions = gallerySection.querySelectorAll('.gallery-color-option');
    if (colorOptions.length) {
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                const color = option.dataset.color;
                console.log(`تم اختيار اللون: ${color}`);
                
                if (color && color !== galleryCurrentColor) {
                    galleryCurrentColor = color;
                    galleryCurrentImageIndex = 0;
                    
                    // تحديث واجهة المستخدم
                    updateGalleryColorSelection(color);
                    updateGalleryThumbnails(color);
                    updateGalleryMainImage(color, galleryCurrentImageIndex);
                    updateGalleryCounter(galleryCurrentImageIndex + 1, productGalleryImages[color].length);
                }
            });
        });
    } else {
        console.warn('لم يتم العثور على خيارات الألوان في المعرض!');
    }

    // إضافة وظيفة تكبير الصورة
    initGalleryZoom();

    console.log('اكتملت تهيئة معرض الصور');
}

/**
 * تحديث الصور المصغرة في المعرض
 * @param {string} color - اللون المحدد (black, white, silver)
 */
function updateGalleryThumbnails(color) {
    console.log(`تحديث الصور المصغرة للون: ${color}`);
    
    const thumbnailsContainer = document.getElementById('gallery-thumbnails');
    if (!thumbnailsContainer) {
        console.error('لم يتم العثور على حاوية الصور المصغرة!');
        return;
    }

    // التأكد من وجود مصفوفة صور للون المحدد
    if (!productGalleryImages[color] || !productGalleryImages[color].length) {
        console.error(`لا توجد صور متاحة للون: ${color}`);
        return;
    }

    // تفريغ حاوية الصور المصغرة
    thumbnailsContainer.innerHTML = '';
    
    // إضافة فئة لإظهار حالة التحميل
    thumbnailsContainer.classList.add('loading');

    // تأخير بسيط قبل إضافة الصور لضمان تهيئة DOM
    setTimeout(() => {
        // إنشاء عنصر لكل صورة مصغرة
        productGalleryImages[color].forEach((imgSrc, index) => {
            try {
                // إنشاء عنصر الصورة المصغرة
                const thumbnail = document.createElement('div');
                thumbnail.className = `gallery-thumbnail ${index === galleryCurrentImageIndex ? 'active' : ''}`;
                thumbnail.style.position = 'relative'; 
                thumbnail.style.overflow = 'hidden'; 
                thumbnail.style.display = 'flex';
                thumbnail.style.alignItems = 'center';
                thumbnail.style.justifyContent = 'center';
                
                // إنشاء الصورة الفعلية داخل المصغرة
                const img = new Image();
                img.src = imgSrc;
                
                // تعيين النمط مباشرة للصورة لضمان العرض الصحيح
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.position = 'absolute';
                img.style.left = '0';
                img.style.top = '0';
                img.style.zIndex = '1';
                img.alt = `طقم SOLY HUX ${getColorName(color)} - صورة ${index + 1}`;
                
                // إضافة تأثير تحميل
                const loader = document.createElement('div');
                loader.className = 'thumbnail-loader';
                loader.innerHTML = '<div class="spinner"></div>';
                thumbnail.appendChild(loader);
                
                // معالجة حدث تحميل الصورة
                img.onload = function() {
                    console.log(`تم تحميل الصورة المصغرة بنجاح: ${imgSrc}`);
                    // إزالة مؤشر التحميل عند اكتمال تحميل الصورة
                    if (loader && loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                    // إضافة الصورة بعد اكتمال التحميل للتأكد من ظهورها
                    if (!thumbnail.contains(img)) {
                        thumbnail.appendChild(img);
                    }
                };
                
                // معالجة حدث فشل تحميل الصورة
                img.onerror = function() {
                    console.error(`فشل في تحميل الصورة المصغرة: ${imgSrc}`);
                    // إزالة مؤشر التحميل
                    if (loader && loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                    // استبدال بصورة بديلة في حالة الفشل
                    img.src = 'Public/images/placeholder.jpg';
                    if (!thumbnail.contains(img)) {
                        thumbnail.appendChild(img);
                    }
                };
                
                // بدء تحميل الصورة بشكل فعلي
                // تم إنشاء الصورة بالفعل، لذا سيبدأ التحميل تلقائيًا
                
                // إضافة مستمع حدث للنقر على الصورة المصغرة
                thumbnail.addEventListener('click', () => {
                    console.log(`تم النقر على الصورة المصغرة رقم: ${index + 1}`);
                    
                    if (index !== galleryCurrentImageIndex) {
                        galleryCurrentImageIndex = index;
                        
                        // تحديث واجهة المستخدم
                        updateGalleryMainImage(galleryCurrentColor, galleryCurrentImageIndex);
                        updateGalleryThumbnailSelection(galleryCurrentImageIndex);
                        updateGalleryCounter(galleryCurrentImageIndex + 1, productGalleryImages[galleryCurrentColor].length);
                    }
                });
                
                // إضافة الصورة المصغرة إلى الحاوية
                thumbnailsContainer.appendChild(thumbnail);
                
            } catch (error) {
                console.error(`حدث خطأ أثناء إنشاء الصورة المصغرة رقم ${index + 1}:`, error);
            }
        });
        
        // إزالة فئة التحميل بعد الانتهاء
        thumbnailsContainer.classList.remove('loading');
        
        console.log(`تم إضافة ${productGalleryImages[color].length} صورة مصغرة.`);
    }, 100); // تأخير بسيط للتأكد من تهيئة DOM
}

/**
 * تحديث الصورة الرئيسية في المعرض
 * @param {string} color - اللون المحدد
 * @param {number} index - فهرس الصورة المراد عرضها
 */
function updateGalleryMainImage(color, index) {
    console.log(`تحديث الصورة الرئيسية: اللون=${color}، الفهرس=${index}`);
    
    const mainImage = document.getElementById('current-main-image');
    const mainImageContainer = document.querySelector('.main-image-container');
    
    if (!mainImage) {
        console.error('لم يتم العثور على عنصر الصورة الرئيسية!');
        return;
    }

    if (productGalleryImages[color] && productGalleryImages[color][index]) {
        // إضافة تأثير التحميل قبل تغيير الصورة
        if (mainImageContainer) {
            mainImageContainer.classList.add('loading');
            
            // إنشاء مؤشر التحميل إذا لم يكن موجودًا
            let loader = mainImageContainer.querySelector('.main-image-loader');
            if (!loader) {
                loader = document.createElement('div');
                loader.className = 'main-image-loader';
                loader.innerHTML = '<div class="spinner large"></div>';
                mainImageContainer.appendChild(loader);
            } else {
                loader.style.display = 'flex';
            }
        }
        
        // تحميل الصورة مسبقًا في صورة مؤقتة للتحقق من نجاح التحميل
        const tempImage = new Image();
        tempImage.src = productGalleryImages[color][index];
        
        tempImage.onload = function() {
            console.log('تم تحميل الصورة الرئيسية بنجاح.');
            
            // تعيين الصورة الجديدة بعد التحميل الناجح
            mainImage.src = productGalleryImages[color][index];
            mainImage.alt = `طقم SOLY HUX ${getColorName(color)} - صورة ${index + 1}`;
            
            // إخفاء مؤشر التحميل
            if (mainImageContainer) {
                setTimeout(() => {
                    mainImageContainer.classList.remove('loading');
                    const loader = mainImageContainer.querySelector('.main-image-loader');
                    if (loader) {
                        loader.style.display = 'none';
                    }
                }, 200);
            }
        };
        
        tempImage.onerror = function() {
            console.error(`فشل في تحميل الصورة الرئيسية: ${productGalleryImages[color][index]}`);
            
            // استخدام صورة بديلة في حالة الفشل
            mainImage.src = 'Public/images/placeholder.jpg';
            mainImage.alt = `طقم SOLY HUX ${getColorName(color)} - صورة ${index + 1} (غير متوفرة)`;
            
            // إخفاء مؤشر التحميل
            if (mainImageContainer) {
                mainImageContainer.classList.remove('loading');
                const loader = mainImageContainer.querySelector('.main-image-loader');
                if (loader) {
                    loader.style.display = 'none';
                }
            }
        };
    } else {
        console.error(`لا توجد صورة متاحة للون: ${color} بالفهرس: ${index}`);
        // استخدام صورة بديلة
        mainImage.src = 'Public/images/placeholder.jpg';
        mainImage.alt = `طقم SOLY HUX ${getColorName(color)} - صورة غير متوفرة`;
        
        // إخفاء مؤشر التحميل
        if (mainImageContainer) {
            mainImageContainer.classList.remove('loading');
            const loader = mainImageContainer.querySelector('.main-image-loader');
            if (loader) {
                loader.style.display = 'none';
            }
        }
    }
}

/**
 * تحديث حالة الصور المصغرة (تحديد الصورة النشطة)
 * @param {number} activeIndex - فهرس الصورة النشطة
 */
function updateGalleryThumbnailSelection(activeIndex) {
    console.log(`تحديث تحديد الصور المصغرة: الفهرس النشط=${activeIndex}`);
    
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    if (!thumbnails.length) {
        console.warn('لم يتم العثور على عناصر الصور المصغرة!');
        return;
    }

    thumbnails.forEach((thumbnail, index) => {
        if (index === activeIndex) {
            thumbnail.classList.add('active');
            
            // التمرير إلى الصورة المصغرة النشطة
            thumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            thumbnail.classList.remove('active');
        }
    });
}

/**
 * تحديث حالة أزرار الألوان (تحديد اللون النشط)
 * @param {string} activeColor - اللون النشط
 */
function updateGalleryColorSelection(activeColor) {
    console.log(`تحديث تحديد الألوان: اللون النشط=${activeColor}`);
    
    const colorButtons = document.querySelectorAll('.gallery-color-option');
    if (!colorButtons.length) {
        console.warn('لم يتم العثور على أزرار الألوان!');
        return;
    }

    colorButtons.forEach(button => {
        if (button.dataset.color === activeColor) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

/**
 * التنقل بين صور المعرض
 * @param {string} direction - اتجاه التنقل ('next' أو 'prev')
 */
function navigateGallery(direction) {
    console.log(`التنقل في المعرض: الاتجاه=${direction}`);
    
    const totalImages = productGalleryImages[galleryCurrentColor]?.length || 0;
    if (!totalImages) {
        console.error('لا توجد صور للتنقل بينها!');
        return;
    }

    // حساب الفهرس الجديد بناءً على الاتجاه
    if (direction === 'prev') {
        galleryCurrentImageIndex = (galleryCurrentImageIndex - 1 + totalImages) % totalImages;
    } else if (direction === 'next') {
        galleryCurrentImageIndex = (galleryCurrentImageIndex + 1) % totalImages;
    } else {
        console.warn(`اتجاه التنقل غير صالح: ${direction}`);
        return;
    }

    // تحديث واجهة المستخدم
    updateGalleryMainImage(galleryCurrentColor, galleryCurrentImageIndex);
    updateGalleryThumbnailSelection(galleryCurrentImageIndex);
    updateGalleryCounter(galleryCurrentImageIndex + 1, totalImages);
}

/**
 * تحديث عداد الصور في المعرض
 * @param {number} current - رقم الصورة الحالية
 * @param {number} total - إجمالي عدد الصور
 */
function updateGalleryCounter(current, total) {
    console.log(`تحديث عداد الصور: ${current}/${total}`);
    
    const currentCounter = document.getElementById('current-gallery-image');
    const totalCounter = document.getElementById('total-gallery-images');
    
    if (currentCounter) {
        currentCounter.textContent = current;
    }
    
    if (totalCounter) {
        totalCounter.textContent = total;
    }
}

/**
 * تهيئة وظيفة تكبير الصورة
 */
function initGalleryZoom() {
    console.log('تهيئة وظيفة تكبير الصورة...');
    
    const zoomButton = document.querySelector('.zoom-button');
    const modal = document.getElementById('image-zoom-modal');
    const zoomedImage = document.getElementById('zoomed-image');
    const closeButton = document.querySelector('.close-zoom');

    if (!zoomButton) {
        console.error('زر التكبير غير موجود!');
        return;
    }

    if (!modal || !zoomedImage || !closeButton) {
        console.error('عناصر نافذة التكبير غير مكتملة!');
        return;
    }

    // إضافة مستمع حدث لزر التكبير
    zoomButton.addEventListener('click', () => {
        console.log('تم النقر على زر التكبير');
        
        const currentImage = document.getElementById('current-main-image');
        if (currentImage) {
            zoomedImage.src = currentImage.src;
            zoomedImage.alt = currentImage.alt;
            modal.style.display = 'flex';
        }
    });

    // إضافة مستمع حدث لزر الإغلاق
    closeButton.addEventListener('click', () => {
        console.log('تم النقر على زر إغلاق التكبير');
        modal.style.display = 'none';
    });

    // إضافة مستمع حدث للنقر خارج الصورة المكبرة
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            console.log('تم النقر على خلفية النافذة المنبثقة');
            modal.style.display = 'none';
        }
    });
}

/**
 * الحصول على اسم اللون بالعربية
 * @param {string} color - كود اللون (black, white, silver)
 * @returns {string} - اسم اللون بالعربية
 */
function getColorName(color) {
    const colorNames = {
        black: 'الأسود',
        white: 'الأبيض',
        silver: 'الفضي'
    };
    
    return colorNames[color] || color;
}

// Testimonials slider functionality
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const testimonialCards = slider.querySelectorAll('.testimonial-card');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    
    // Hide all testimonials except the first one
    testimonialCards.forEach((card, index) => {
        if (index !== 0) {
            card.style.display = 'none';
        }
    });
    
    // Show a specific testimonial
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.style.display = i === index ? 'flex' : 'none';
            card.classList.toggle('active', i === index);
        });
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    // Add event listeners for navigation
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = testimonialCards.length - 1;
            }
            showTestimonial(newIndex);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonialCards.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        });
    }
    
    // Add event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto rotate testimonials every 8 seconds
    setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonialCards.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
    }, 8000);
}

// Initialize all components when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('تم تحميل الصفحة بالكامل، جاري تهيئة المعرض...');
    initProductGallery();
}); 

// Initialize Enhanced Testimonials Section
function initEnhancedTestimonials() {
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (!testimonialsSlider) return;

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const navPrev = document.querySelector('.prev-testimonial');
    const navNext = document.querySelector('.next-testimonial');
    const indicators = document.querySelectorAll('.testimonial-indicators .indicator');
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    // Hide all testimonials except the first one
    testimonialCards.forEach((card, index) => {
        if (index !== 0) {
            card.style.display = 'none';
        }
    });
    
    // Function to show a specific testimonial with animation
    function showTestimonial(index) {
        if (index === currentSlide) return;
        
        // Fade out current testimonial
        testimonialCards[currentSlide].style.opacity = 0;
        setTimeout(() => {
            // Hide all testimonials
            testimonialCards.forEach(card => {
                card.style.display = 'none';
            });
            
            // Remove active class from all indicators
            indicators.forEach(indicator => {
                indicator.classList.remove('active');
            });
            
            // Show the selected testimonial and update indicators
            testimonialCards[index].style.display = 'flex';
            testimonialCards[index].style.opacity = 0;
            
            setTimeout(() => {
                testimonialCards[index].style.opacity = 1;
            }, 50);
            
            indicators[index].classList.add('active');
            
            // Update current slide
            currentSlide = index;
        }, 300);
    }
    
    // Add transition effect to cards
    testimonialCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease';
        card.style.opacity = 1;
    });
    
    // Next testimonial button event
    if (navNext) {
        navNext.addEventListener('click', () => {
            resetAutoSlideTimer();
            let nextSlide = (currentSlide + 1) % testimonialCards.length;
            showTestimonial(nextSlide);
        });
    }
    
    // Previous testimonial button event
    if (navPrev) {
        navPrev.addEventListener('click', () => {
            resetAutoSlideTimer();
            let prevSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
            showTestimonial(prevSlide);
        });
    }
    
    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            resetAutoSlideTimer();
            showTestimonial(index);
        });
    });
    
    // Make thumbnails interactive
    const thumbnails = document.querySelectorAll('.review-thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const mainImage = this.closest('.testimonial-gallery').querySelector('.main-review-image img');
            const thumbnailSrc = this.querySelector('img').src;
            
            // Store current main image src
            const currentMainSrc = mainImage.src;
            
            // Add fade transition to main image
            mainImage.style.transition = 'opacity 0.3s ease';
            
            // Swap images with animation
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.src = thumbnailSrc;
                mainImage.style.opacity = '1';
            }, 300);
            
            // Update thumbnail with previous main image
            const thumbnailImg = this.querySelector('img');
            thumbnailImg.style.transition = 'opacity 0.3s ease';
            thumbnailImg.style.opacity = '0';
            
            setTimeout(() => {
                thumbnailImg.src = currentMainSrc;
                thumbnailImg.style.opacity = '1';
            }, 300);
        });
    });
    
    // Auto-rotate testimonials every 5 seconds
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (!document.hidden) {
                let nextSlide = (currentSlide + 1) % testimonialCards.length;
                showTestimonial(nextSlide);
            }
        }, 6000);
    }
    
    function resetAutoSlideTimer() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Start auto-slide
    startAutoSlide();
    
    // Pause auto-slide when user interacts with testimonials
    testimonialsSlider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    testimonialsSlider.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
    
    // Initialize gallery lightbox
    initReviewsGalleryLightbox();
    
    // Initialize Egyptian reviews section
    initEgyptianReviews();
}

// Initialize Egyptian reviews section
function initEgyptianReviews() {
    const reviewsGallery = document.querySelector('.reviews-gallery');
    const seeMoreButton = document.querySelector('.see-more-button');
    
    if (!reviewsGallery || !seeMoreButton) return;
    
    // Initially show only 6 reviews
    const reviewItems = reviewsGallery.querySelectorAll('.review-gallery-item');
    let visibleCount = 6;
    
    // Hide extra reviews
    reviewItems.forEach((item, index) => {
        if (index >= visibleCount) {
            item.style.display = 'none';
        }
    });
    
    // Handle see more button click
    seeMoreButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // If all reviews are shown, hide extra ones
        if (visibleCount >= reviewItems.length) {
            visibleCount = 6;
            seeMoreButton.innerHTML = 'عرض المزيد من التقييمات <i class="fas fa-chevron-down"></i>';
            seeMoreButton.classList.remove('expanded');
            
            // Scroll to reviews section
            document.querySelector('.reviews-gallery-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            // Show all reviews
            visibleCount = reviewItems.length;
            seeMoreButton.innerHTML = 'عرض أقل <i class="fas fa-chevron-up"></i>';
            seeMoreButton.classList.add('expanded');
        }
        
        // Update visibility
        reviewItems.forEach((item, index) => {
            if (index < visibleCount) {
                item.style.display = '';
                
                // Add animation for newly visible items
                if (index >= 6) {
                    item.style.animation = 'fadeInUp 0.5s forwards';
                    item.style.animationDelay = `${(index - 6) * 0.1}s`;
                }
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // Add hover effect for reviews
    reviewItems.forEach(item => {
        const overlay = item.querySelector('.review-gallery-overlay');
        const reviewText = item.querySelector('.review-text');
        
        // Store original text to show full version on hover
        if (reviewText) {
            const originalText = reviewText.textContent;
            const truncatedText = truncateText(originalText, 100);
            
            // Initially set truncated text if needed
            if (window.innerWidth < 768 && originalText.length > 100) {
                reviewText.textContent = truncatedText;
                
                // Show full text on hover
                item.addEventListener('mouseenter', () => {
                    reviewText.textContent = originalText;
                });
                
                // Restore truncated text when mouse leaves
                item.addEventListener('mouseleave', () => {
                    reviewText.textContent = truncatedText;
                });
            }
        }
    });
    
    // Helper function to truncate text
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
}

// Initialize Reviews Gallery Lightbox functionality
function initReviewsGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.review-gallery-item, .main-review-image');
    
    if (galleryItems.length === 0) return;
    
    // Create lightbox elements if they don't exist
    if (!document.querySelector('.reviews-lightbox')) {
        const lightbox = document.createElement('div');
        lightbox.className = 'reviews-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-container">
                <div class="lightbox-content">
                    <img src="" alt="صورة تقييم كبيرة">
                    <div class="lightbox-caption">تجربة العميل مع الطقم</div>
                </div>
                <button class="lightbox-close"><i class="fas fa-times"></i></button>
                <button class="lightbox-nav prev"><i class="fas fa-chevron-right"></i></button>
                <button class="lightbox-nav next"><i class="fas fa-chevron-left"></i></button>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Add CSS for lightbox
        const style = document.createElement('style');
        style.textContent = `
            .reviews-lightbox {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 9999;
                display: none;
                direction: rtl;
            }
            .reviews-lightbox.active {
                display: block;
                animation: lightboxFadeIn 0.3s ease forwards;
            }
            @keyframes lightboxFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .lightbox-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0,0,0,0.92);
                animation: overlayFadeIn 0.4s ease;
            }
            @keyframes overlayFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .lightbox-container {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.95);
                max-width: 90%;
                max-height: 90%;
                animation: containerZoomIn 0.4s ease forwards;
            }
            @keyframes containerZoomIn {
                from { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
                to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
            .lightbox-content {
                position: relative;
                width: 100%;
                height: 100%;
                text-align: center;
            }
            .lightbox-content img {
                max-width: 100%;
                max-height: 85vh;
                display: block;
                margin: 0 auto;
                box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                border-radius: 5px;
                transition: opacity 0.3s ease;
            }
            .lightbox-caption {
                color: white;
                text-align: center;
                padding: 15px;
                font-size: 18px;
                font-weight: 500;
            }
            .lightbox-close {
                position: absolute;
                top: -50px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 28px;
                cursor: pointer;
                opacity: 0.8;
                transition: all 0.3s ease;
            }
            .lightbox-close:hover {
                opacity: 1;
                transform: scale(1.1);
            }
            .lightbox-nav {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(255,255,255,0.1);
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                opacity: 0.7;
                transition: all 0.3s ease;
            }
            .lightbox-nav:hover {
                background: rgba(255,255,255,0.3);
                opacity: 1;
                transform: translateY(-50%) scale(1.1);
            }
            .lightbox-nav.prev {
                right: -80px;
            }
            .lightbox-nav.next {
                left: -80px;
            }
            .lightbox-nav i {
                font-size: 20px;
            }
            @media (max-width: 992px) {
                .lightbox-nav.prev { right: -60px; }
                .lightbox-nav.next { left: -60px; }
            }
            @media (max-width: 768px) {
                .lightbox-nav.prev { right: 10px; }
                .lightbox-nav.next { left: 10px; }
                .lightbox-nav {
                    width: 40px;
                    height: 40px;
                    background: rgba(0,0,0,0.5);
                }
                .lightbox-close {
                    top: 10px;
                    right: 10px;
                    background: rgba(0,0,0,0.5);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Get lightbox elements
    const lightbox = document.querySelector('.reviews-lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-content img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-nav.prev');
    const nextBtn = lightbox.querySelector('.lightbox-nav.next');
    
    // Store all gallery images
    let galleryImages = [];
    let galleryAltTexts = [];
    
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            galleryImages.push(img.src);
            galleryAltTexts.push(img.alt || 'صورة تقييم العميل');
        }
    });
    
    let currentImageIndex = 0;
    
    // Open lightbox when clicking on gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                lightboxImg.style.opacity = '0';
                lightboxImg.src = img.src;
                currentImageIndex = galleryImages.indexOf(img.src);
                
                // Update caption from alt text
                lightboxCaption.textContent = img.alt || 'صورة تقييم العميل';
                
                lightbox.classList.add('active');
                
                // Prevent scrolling on body
                document.body.style.overflow = 'hidden';
                
                // Fade in image
                setTimeout(() => {
                    lightboxImg.style.opacity = '1';
                }, 100);
            }
        });
    });
    
    // Close lightbox when clicking close button or overlay
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        // Restore scrolling
        document.body.style.overflow = '';
    }
    
    // Navigate through images
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            // Adjust arrow controls for RTL
            if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else {
                showNextImage();
            }
        }
    });
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    }
    
    function updateLightboxImage() {
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = galleryImages[currentImageIndex];
            lightboxImg.style.opacity = '1';
        }, 200);
    }
    
    // Add fade transition to lightbox image
    lightboxImg.style.transition = 'opacity 0.3s ease';
}

// تهيئة قسم التقييمات
function initReviewsGallery() {
    const reviewItems = document.querySelectorAll('.review-gallery-item');
    const seeMoreButton = document.querySelector('.see-more-button');
    
    // إعداد التفاعل مع الصور على الموبايل
    if (window.innerWidth <= 768) {
        setupMobileReviewsInteraction(reviewItems);
    }
    
    // إخفاء زر "عرض المزيد" لأننا سنعرض كل التقييمات مباشرة
    if (seeMoreButton) {
        seeMoreButton.style.display = 'none';
    }
    
    // عرض جميع التقييمات
    reviewItems.forEach((item) => {
        item.style.display = '';
        item.style.opacity = '1';
    });
    
    // إضافة تأثيرات التفاعل
    reviewItems.forEach(item => {
        const reviewText = item.querySelector('.review-text');
        if (reviewText && reviewText.textContent.length > 120 && window.innerWidth > 768) {
            const fullText = reviewText.textContent;
            reviewText.setAttribute('data-full-text', fullText);
            
            item.addEventListener('mouseenter', () => {
                reviewText.textContent = fullText;
            });
            
            item.addEventListener('mouseleave', () => {
                reviewText.textContent = fullText.substring(0, 120) + '...';
            });
            
            // تعيين النص المختصر في البداية
            setTimeout(() => {
                reviewText.textContent = fullText.substring(0, 120) + '...';
            }, 100);
        }
    });
}

// إعداد التفاعل مع الصور على الموبايل
function setupMobileReviewsInteraction(reviewItems) {
    if (!reviewItems.length) return;
    
    // إضافة تأثير التمرير السلس
    const gallery = document.querySelector('.reviews-gallery');
    let startX, startScrollLeft;
    let isDragging = false;
    
    // إضافة مؤشرات التمرير
    const indicator = document.createElement('div');
    indicator.className = 'review-scroll-indicator';
    
    reviewItems.forEach((item, index) => {
        // إضافة رقم لكل صورة
        const counter = document.createElement('div');
        counter.className = 'review-counter';
        counter.textContent = `${index + 1}/${reviewItems.length}`;
        item.appendChild(counter);
        
        // تحسين عرض النص على الموبايل
        const reviewText = item.querySelector('.review-text');
        if (reviewText) {
            const fullText = reviewText.textContent;
            // اختصار النص إذا كان طويلاً
            if (fullText.length > 120) {
                const truncatedText = fullText.substring(0, 120) + '...';
                reviewText.textContent = truncatedText;
                reviewText.setAttribute('data-full-text', fullText);
                
                // إضافة زر لعرض النص الكامل
                const readMoreBtn = document.createElement('button');
                readMoreBtn.className = 'read-more-btn';
                readMoreBtn.textContent = 'قراءة المزيد';
                item.querySelector('.review-content').appendChild(readMoreBtn);
                
                readMoreBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (reviewText.textContent.includes('...')) {
                        reviewText.textContent = fullText;
                        readMoreBtn.textContent = 'عرض أقل';
                    } else {
                        reviewText.textContent = truncatedText;
                        readMoreBtn.textContent = 'قراءة المزيد';
                    }
                });
            }
        }
    });
    
    if (gallery) {
        // بدء السحب
        gallery.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX;
            startScrollLeft = gallery.scrollLeft;
            gallery.style.cursor = 'grabbing';
        });
        
        gallery.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX;
            startScrollLeft = gallery.scrollLeft;
        });
        
        // أثناء السحب
        gallery.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX;
            const distance = x - startX;
            gallery.scrollLeft = startScrollLeft - distance;
        });
        
        gallery.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX;
            const distance = x - startX;
            gallery.scrollLeft = startScrollLeft - distance;
        });
        
        // إنهاء السحب
        gallery.addEventListener('mouseup', () => {
            isDragging = false;
            gallery.style.cursor = 'grab';
        });
        
        gallery.addEventListener('mouseleave', () => {
            isDragging = false;
            gallery.style.cursor = 'grab';
        });
        
        gallery.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        // تحديد التقييم الحالي عند التمرير
        gallery.addEventListener('scroll', () => {
            const scrollLeft = gallery.scrollLeft;
            const itemWidth = reviewItems[0].offsetWidth + 20; // مع هامش
            const currentIndex = Math.round(scrollLeft / itemWidth);
            
            reviewItems.forEach((item, index) => {
                if (index === currentIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });
    }
    
    // إضافة خاصية العرض بشاشة كاملة عند النقر
    reviewItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                // تحويل إلى وضع ملء الشاشة
                if (!document.fullscreenElement) {
                    if (item.requestFullscreen) {
                        item.requestFullscreen();
                    } else if (item.webkitRequestFullscreen) {
                        item.webkitRequestFullscreen();
                    } else if (item.msRequestFullscreen) {
                        item.msRequestFullscreen();
                    }
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }
            }
        });
    });
} 