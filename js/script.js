document.addEventListener('DOMContentLoaded', function() {
    // تحقق من حالة الاتصال وقم بمزامنة الطلبات المعلقة إذا كان هناك اتصال
    if (navigator.onLine && window.firebaseServices) {
        console.log('جاري التحقق من وجود طلبات معلقة للمزامنة...');
        window.firebaseServices.syncPendingOrders().then((synced) => {
            if (synced) {
                console.log('تمت مزامنة جميع الطلبات المعلقة بنجاح');
            } else {
                console.warn('لم تتم مزامنة بعض الطلبات المعلقة، سيتم المحاولة مرة أخرى لاحقًا');
            }
        });
    }

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
    // تعريف متغير نموذج الطلب
    const orderForm = document.getElementById('codOrderForm');
    if (!orderForm) {
        console.error('لم يتم العثور على نموذج الطلب!');
        return;
    }
    
    // متغير لتخزين المنتجات المختارة
    let selectedProducts = [];
    
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
            // إضافة منتج جديد باستخدام نفس المنطق الموجود في زر إضافة منتج
            addProductBtn.click();
            
            // إظهار رسالة الخصم
            const discountMessage = document.createElement('div');
            discountMessage.className = 'discount-applied-message';
            discountMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>تم تطبيق خصم 10٪!</span>
            `;
            
            // أنماط CSS
            discountMessage.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
            discountMessage.style.color = '#4CAF50';
            discountMessage.style.padding = '8px 12px';
            discountMessage.style.borderRadius = '5px';
            discountMessage.style.margin = '10px 0';
            discountMessage.style.display = 'flex';
            discountMessage.style.alignItems = 'center';
            discountMessage.style.justifyContent = 'center';
            discountMessage.style.gap = '8px';
            discountMessage.style.fontSize = '14px';
            discountMessage.style.fontWeight = 'bold';
            
            // إضافة الرسالة بعد آخر منتج
            const lastProduct = document.querySelector('.product-item:last-child');
            if (lastProduct) {
                lastProduct.appendChild(discountMessage);
                
                // تأثير حركي للظهور
                discountMessage.style.opacity = '0';
                discountMessage.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    discountMessage.style.opacity = '1';
                    discountMessage.style.transform = 'translateY(0)';
                    discountMessage.style.transition = 'all 0.3s ease';
                }, 10);
                
                // إزالة الرسالة بعد 3 ثوانٍ
                setTimeout(() => {
                    discountMessage.style.opacity = '0';
                    discountMessage.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        discountMessage.remove();
                    }, 300);
                }, 3000);
            }
            
            // تحديث ملخص الطلب لعكس الخصم
            updateOrderSummary();
            
            // تحديث إمكانية رؤية أزرار إضافة الأطقم
            updateAddOutfitButtons();
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
        // تحديث إمكانية رؤية زر إضافة طقم آخر
        const addOutfitBtn = document.getElementById('addOutfitDiscountBtn');
        if (!addOutfitBtn) return;
        
        // عرض الزر فقط عندما يكون هناك منتج واحد
        const productCount = document.querySelectorAll('.product-item').length;
        
        if (productCount === 1) {
            addOutfitBtn.parentElement.style.display = 'block';
            // تحريك للظهور
            addOutfitBtn.parentElement.style.opacity = '0';
            addOutfitBtn.parentElement.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                addOutfitBtn.parentElement.style.opacity = '1';
                addOutfitBtn.parentElement.style.transform = 'translateY(0)';
                addOutfitBtn.parentElement.style.transition = 'all 0.3s ease';
            }, 10);
        } else {
            // إخفاء بتأثير حركي
            if (addOutfitBtn.parentElement.style.display !== 'none') {
                addOutfitBtn.parentElement.style.opacity = '0';
                addOutfitBtn.parentElement.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    addOutfitBtn.parentElement.style.display = 'none';
                }, 300);
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
        
        // اختيار المقاس مع تأثيرات متقدمة
        const sizeButtons = productElement.querySelectorAll('.size-btn');
        sizeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // إزالة الفئة النشطة من جميع الأزرار
                sizeButtons.forEach(sizeBtn => sizeBtn.classList.remove('active'));
                
                // إضافة الفئة النشطة للزر المحدد
                this.classList.add('active');
                
                // تأثير حركي على الزر المحدد
                this.animate([
                    { transform: 'scale(0.9)' },
                    { transform: 'scale(1.1)' },
                    { transform: 'scale(1)' }
                ], {
                    duration: 300,
                    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                });
                
                // تحديث تفاصيل المنتج
                const sizeText = productElement.querySelector('.product-preview-size');
                sizeText.textContent = `المقاس: ${this.dataset.size}`;
                sizeText.animate([
                    { opacity: 0, transform: 'translateY(-5px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], {
                    duration: 300,
                    easing: 'ease-out'
                });
            });
        });
        
        // أزرار الكمية مع تأثيرات متقدمة
        const qtyInput = productElement.querySelector('.product-qty');
        const decreaseBtn = productElement.querySelector('.quantity-btn.decrease');
        const increaseBtn = productElement.querySelector('.quantity-btn.increase');
        
        // زر زيادة الكمية
        increaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(qtyInput.value);
            if (currentValue < 10) {
                qtyInput.value = currentValue + 1;
                
                // تأثير حركي على زر الزيادة
                this.animate([
                    { transform: 'scale(0.8)' },
                    { transform: 'scale(1.2)' },
                    { transform: 'scale(1)' }
                ], {
                    duration: 300,
                    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                });
                
                // تحديث تفاصيل المنتج
                const qtyText = productElement.querySelector('.product-preview-qty');
                qtyText.textContent = `الكمية: ${currentValue + 1}`;
                qtyText.animate([
                    { opacity: 0, transform: 'translateY(-5px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], {
                    duration: 300,
                    easing: 'ease-out'
                });
                
                // تحديث إجمالي الطلب
                updateOrderSummary();
            }
        });
        
        // زر تقليل الكمية
        decreaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(qtyInput.value);
            if (currentValue > 1) {
                qtyInput.value = currentValue - 1;
                
                // تأثير حركي على زر التقليل
                this.animate([
                    { transform: 'scale(0.8)' },
                    { transform: 'scale(1.2)' },
                    { transform: 'scale(1)' }
                ], {
                    duration: 300,
                    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                });
                
                // تحديث تفاصيل المنتج
                const qtyText = productElement.querySelector('.product-preview-qty');
                qtyText.textContent = `الكمية: ${currentValue - 1}`;
                qtyText.animate([
                    { opacity: 0, transform: 'translateY(-5px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], {
                    duration: 300,
                    easing: 'ease-out'
                });
                
                // تحديث إجمالي الطلب
                updateOrderSummary();
            }
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
    
    // دالة لتحديث مصفوفة المنتجات المختارة
    function updateSelectedProducts() {
        selectedProducts = [];
        
        // جمع بيانات كل منتج من عناصر واجهة المستخدم
        document.querySelectorAll('.product-item').forEach(item => {
            const productId = item.dataset.productId;
            const color = item.querySelector('.product-color-option.active').dataset.color;
            const size = item.querySelector('.size-btn.active').dataset.size;
            const quantity = parseInt(item.querySelector('.product-qty').value);
            
            selectedProducts.push({
                product_id: productId,
                color: color,
                size: size,
                quantity: quantity,
                price: productPrices.sale
            });
        });
        
        console.log('تم تحديث المنتجات المختارة:', selectedProducts);
        return selectedProducts;
    }
    
    // تعريف عنصر العرض للسعر الإجمالي
    const totalPriceElement = document.getElementById('totalPrice');
    
    // دالة لحساب إجمالي العناصر في الطلب
    function calculateTotalItems() {
        let total = 0;
        document.querySelectorAll('.product-qty').forEach(qty => {
            total += parseInt(qty.value || 0);
        });
        return total;
    }
    
    // حدث تقديم الطلب
    orderForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // منع السلوك الافتراضي للنموذج
        
        // التحقق من صحة النموذج
        if (!validateOrderForm()) {
            return false;
        }
        
        // تحديث مصفوفة المنتجات المختارة
        updateSelectedProducts();
        
        // تعطيل زر الإرسال وإظهار حالة التحميل
        const submitBtn = document.querySelector('.order-submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> جاري إتمام الطلب...`;
        
        try {
            // جمع بيانات الطلب
            const orderData = {
                order_number: window.firebaseServices && typeof window.firebaseServices.generateOrderNumber === 'function' 
                               ? window.firebaseServices.generateOrderNumber() 
                               : generateRandomOrderNumber(),
                order_date: new Date().toISOString(),
                customer_name: document.getElementById('fullName').value,
                customer_mobile: document.getElementById('mobileNumber').value,
                customer_mobile2: document.getElementById('mobileNumber2') ? document.getElementById('mobileNumber2').value : '',
                customer_address: document.getElementById('detailedAddress').value + ' - ' + document.getElementById('governorate').value,
                order_notes: document.getElementById('orderNotes').value || '',
                product_details: JSON.stringify(selectedProducts),
                total_items: calculateTotalItems(),
                total_price: totalPriceElement.textContent,
                status: 'pending' // حالة الطلب الافتراضية
            };
            
            console.log('بيانات الطلب المرسلة:', orderData);
            
            // محاولة حفظ الطلب على Firebase
            let saved = false;
            if (navigator.onLine && window.firebaseServices && typeof window.firebaseServices.saveOrder === 'function') {
                try {
                    saved = await window.firebaseServices.saveOrder(orderData);
                    console.log('تم حفظ الطلب في Firebase بنجاح:', saved);
                } catch (error) {
                    console.error('خطأ في حفظ الطلب في Firebase:', error);
                    saved = false;
                }
            } else {
                console.log('تم تخطي حفظ Firebase، محاولة الحفظ في لوحة التحكم');
                // محاولة الحفظ في لوحة التحكم
                try {
                    await saveToAdminDashboard(orderData);
                    saved = true;
                    console.log('تم حفظ الطلب في لوحة التحكم بنجاح');
                } catch (dashboardError) {
                    console.error('خطأ في حفظ الطلب في لوحة التحكم:', dashboardError);
                }
            }
            
            if (!saved) {
                // حفظ محلي في حالة عدم الاتصال أو وجود خطأ
                saveOrderLocally(orderData.order_number, orderData);
                console.log('تم حفظ الطلب محليًا بنجاح');
            }
            
            // عرض رسالة النجاح بغض النظر عن نتيجة الحفظ
            processSuccessfulOrder(orderData.order_number, submitBtn, originalBtnText);
            
        } catch (error) {
            console.error('حدث خطأ أثناء معالجة الطلب:', error);
            alert('عذراً، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.');
            
            // إعادة تفعيل زر الإرسال
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
        
        return false;
    });
    
    // دالة حفظ البيانات في لوحة التحكم
    async function saveToAdminDashboard(orderData) {
        // تكييف البيانات لتناسب تنسيق لوحة التحكم
        const dashboardData = {
            customer_name: orderData.customer_name,
            customer_mobile: orderData.customer_mobile,
            customer_address: orderData.customer_address,
            order_number: orderData.order_number,
            order_date: orderData.order_date,
            total_price: orderData.total_price,
            products: orderData.product_details,
            notes: orderData.order_notes || '',
            status: 'جديد'
        };
        
        // حفظ البيانات محليًا في localStorage كحل مؤقت
        // يمكن تعديل هذا لاحقًا لإرسال البيانات إلى لوحة التحكم
        const existingOrders = JSON.parse(localStorage.getItem('adminDashboardOrders') || '[]');
        existingOrders.push(dashboardData);
        localStorage.setItem('adminDashboardOrders', JSON.stringify(existingOrders));
        
        // إشعار لمسؤول الموقع (يمكن تكييفه لإرسال بريد إلكتروني)
        if (typeof notifyAdmin === 'function') {
            try {
                await notifyAdmin(dashboardData);
            } catch (e) {
                console.log('لم يتم إشعار المسؤول بسبب خطأ:', e);
            }
        }
        
        return { success: true, orderId: dashboardData.order_number };
    }
    
    // دالة إشعار مسؤول الموقع (هذه نسخة أولية)
    function notifyAdmin(orderData) {
        // يمكن تنفيذ وظيفة إشعار هنا في المستقبل
        console.log('طلب جديد يحتاج المراجعة:', orderData);
        return Promise.resolve(true);
    }
    
    // إضافة مستمع حدث قوي على زر إتمام الطلب
    const submitOrderBtn = document.querySelector('.order-submit-btn');
    if (submitOrderBtn) {
        // إزالة أي مستمعات حدث سابقة لتجنب التداخل
        submitOrderBtn.removeEventListener('click', submitButtonClickHandler);
        submitOrderBtn.addEventListener('click', submitButtonClickHandler);
    }
    
    // دالة معالجة النقر على زر الإرسال
    function submitButtonClickHandler(event) {
        event.preventDefault(); // منع السلوك الافتراضي
        event.stopPropagation(); // منع انتشار الحدث
        
        console.log('تم النقر على زر إتمام الطلب');
        
        // تشغيل حدث إرسال النموذج يدوياً
        const submitEvent = new Event('submit', {
            'bubbles': true,
            'cancelable': true
        });
        
        // التحقق من وجود النموذج قبل تشغيل الحدث
        if (orderForm && typeof orderForm.dispatchEvent === 'function') {
            // إرسال الحدث إلى النموذج
            orderForm.dispatchEvent(submitEvent);
        } else {
            console.error('لم يتم العثور على نموذج الطلب!');
        }
    }
    
    // دالة إنشاء رقم طلب عشوائي في حالة عدم وجود Firebase
    function generateRandomOrderNumber() {
        const timestamp = new Date().getTime().toString().slice(-8);
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `ORD-${timestamp}-${random}`;
    }
    
    // Function to validate the order form before submission
    function validateOrderForm() {
        const fullName = document.getElementById('fullName');
        const mobileNumber = document.getElementById('mobileNumber');
        const governorate = document.getElementById('governorate');
        const detailedAddress = document.getElementById('detailedAddress');
        
        // Reset previous errors
        document.querySelectorAll('.form-field-error').forEach(error => error.remove());
        
        let isValid = true;
        
        // Validate full name
        if (!fullName.value.trim()) {
            showFieldError(fullName, 'الاسم الكامل مطلوب');
            isValid = false;
        }
        
        // Validate mobile number (must be 11 digits for Egyptian numbers)
        const mobileRegex = /^01[0-2,5]{1}[0-9]{8}$/;
        if (!mobileRegex.test(mobileNumber.value.trim())) {
            showFieldError(mobileNumber, 'يرجى إدخال رقم موبايل صحيح مكون من 11 رقم');
            isValid = false;
        }
        
        // Validate governorate
        if (governorate.value === '') {
            showFieldError(governorate, 'يرجى اختيار المحافظة');
            isValid = false;
        }
        
        // Validate detailed address
        if (!detailedAddress.value.trim()) {
            showFieldError(detailedAddress, 'العنوان التفصيلي مطلوب');
            isValid = false;
        } else if (detailedAddress.value.trim().length < 10) {
            showFieldError(detailedAddress, 'يجب أن يحتوي العنوان على الأقل 10 أحرف');
            isValid = false;
        }
        
        // Scroll to first error if exists
        if (!isValid) {
            const firstError = document.querySelector('.form-field-error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        
        return isValid;
    }
    
    // Helper function to display validation errors
    function showFieldError(field, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'form-field-error';
        errorElement.textContent = message;
        
        field.classList.add('error');
        field.parentNode.appendChild(errorElement);
        
        // Remove error when field is focused
        field.addEventListener('focus', function() {
            this.classList.remove('error');
            const error = this.parentNode.querySelector('.form-field-error');
            if (error) {
                error.remove();
            }
        });
    }
    
    // Save order locally if offline
    function saveOrderLocally(orderId, orderData) {
        console.log('حفظ الطلب محليًا:', orderId);
        const pendingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '{}');
        pendingOrders[orderId] = orderData;
        localStorage.setItem('pendingOrders', JSON.stringify(pendingOrders));
    }
    
    // Process successful order
    function processSuccessfulOrder(orderNumber, submitBtn, originalBtnText) {
        // إنشاء نافذة التأكيد إذا لم تكن موجودة
        let successModal = document.getElementById('orderSuccessModal');
        if (!successModal) {
            successModal = createSuccessModal();
        }
        
        // ابحث عن عنصر رقم الطلب في النافذة المنبثقة
        const orderNumberSpan = successModal.querySelector('#successOrderNumber');
        if (orderNumberSpan) {
            orderNumberSpan.textContent = orderNumber;
        }
        
        // إضافة أنماط CSS للتأكد من أن النافذة تظهر فوق كل شيء
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .success-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
            }
            .success-modal.visible {
                opacity: 1;
                visibility: visible;
                transform: scale(1);
            }
            .success-modal-content {
                background: white;
                padding: 30px;
                border-radius: 10px;
                text-align: center;
                max-width: 90%;
                width: 400px;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
                position: relative;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            .success-modal.visible .success-modal-content {
                transform: scale(1);
            }
            .success-icon {
                font-size: 70px;
                color: #4CAF50;
                margin-bottom: 20px;
                animation: scaleIn 0.5s ease forwards;
            }
            @keyframes scaleIn {
                0% { transform: scale(0); opacity: 0; }
                70% { transform: scale(1.2); opacity: 1; }
                100% { transform: scale(1); opacity: 1; }
            }
            .close-success-modal {
                background: linear-gradient(145deg, #f0f0f0, #e6e6e6);
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                margin-top: 20px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
            }
            .close-success-modal:hover {
                background: linear-gradient(145deg, #e6e6e6, #f0f0f0);
                transform: translateY(-2px);
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }
        `;
        document.head.appendChild(styleElement);
        
        // عرض النافذة المنبثقة
        successModal.style.display = 'flex';
        
        // تطبيق تأثير حركي بعد فترة قصيرة
        setTimeout(() => {
            successModal.classList.add('visible');
        }, 10);
        
        // إعادة تعيين النموذج
        document.getElementById('codOrderForm').reset();
        
        // إعادة تفعيل زر الإرسال
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        
        // إعادة تعيين المنتجات
        resetProductItems();
        
        // تمرير إلى أعلى الصفحة
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // تسجيل في Analytics إذا كان متاحًا
        if (window.firebaseServices && window.firebaseServices.analytics) {
            window.firebaseServices.analytics.logEvent('purchase_complete', {
                order_id: orderNumber,
                value: parseFloat(totalPriceElement.textContent.replace(/[^\d.]/g, ''))
            });
        }
    }
    
    // دالة إنشاء رسالة النجاح
    function createSuccessModal() {
        const modal = document.createElement('div');
        modal.id = 'orderSuccessModal';
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="success-modal-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>تم استلام طلبك بنجاح!</h3>
                <p>رقم الطلب: <span id="successOrderNumber"></span></p>
                <p>سنتواصل معك قريباً لتأكيد الطلب</p>
                <button id="closeSuccessModal" class="close-success-modal">إغلاق</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add close event
        modal.querySelector('#closeSuccessModal').addEventListener('click', () => {
            modal.classList.remove('visible');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
        
        return modal;
    }
    
    // دالة إعادة تعيين عناصر المنتجات
    function resetProductItems() {
        // إزالة كل المنتجات ما عدا الأول
        document.querySelectorAll('.product-item').forEach((item, index) => {
            if (index > 0) { // الاحتفاظ بالمنتج الأول فقط
                item.remove();
            }
        });
        
        // إعادة تعيين المنتج الأول إلى الإعدادات الافتراضية
        const firstProduct = document.querySelector('.product-item');
        if (firstProduct) {
            const blackColor = firstProduct.querySelector('.product-color-option.black');
            if (blackColor) blackColor.click();
            
            const sizeLBtn = firstProduct.querySelector('.size-btn[data-size="L"]');
            if (sizeLBtn) sizeLBtn.click();
            
            const qtyInput = firstProduct.querySelector('.product-qty');
            if (qtyInput) qtyInput.value = '1';
        }
        
        // تحديث إمكانية رؤية زر الإزالة
        updateRemoveButtonVisibility();
        
        // تحديث ملخص الطلب
        updateOrderSummary();
        
        // تحديث إمكانية رؤية أزرار إضافة الأطقم
        if (typeof updateAddOutfitButtons === 'function') {
            updateAddOutfitButtons();
        }
    }
} // نهاية دالة initOrderForm

// التحقق من صحة النموذج
function validateOrderForm() {
    const nameField = document.getElementById('customerName');
    const mobileField = document.getElementById('customerMobile');
    const governorateField = document.getElementById('customerGovernorate');
    const addressField = document.getElementById('customerAddress');
    
    let isValid = true;
    
    // التحقق من وجود منتج واحد على الأقل
    if (document.querySelectorAll('.product-item').length === 0) {
        alert('يرجى إضافة منتج واحد على الأقل');
        isValid = false;
        return isValid;
    }
    
    // التحقق من الاسم
    if (!nameField.value.trim()) {
        nameField.classList.add('error');
        isValid = false;
    } else {
        nameField.classList.remove('error');
    }
    
    // التحقق من رقم الهاتف (11 رقم)
    const mobileRegex = /^01[0-9]{9}$/;
    if (!mobileRegex.test(mobileField.value.trim())) {
        mobileField.classList.add('error');
        isValid = false;
    } else {
        mobileField.classList.remove('error');
    }
    
    // التحقق من المحافظة
    if (!governorateField.value.trim()) {
        governorateField.classList.add('error');
        isValid = false;
    } else {
        governorateField.classList.remove('error');
    }
    
    // التحقق من العنوان
    if (!addressField.value.trim()) {
        addressField.classList.add('error');
        isValid = false;
    } else {
        addressField.classList.remove('error');
    }
    
    // إظهار رسالة خطأ إذا كان النموذج غير صالح
    if (!isValid) {
        alert('يرجى إكمال جميع الحقول المطلوبة بشكل صحيح');
    }
    
    return isValid;
}

// جمع بيانات الطلب لإرسالها
function collectOrderData() {
    const productItems = document.querySelectorAll('.product-item');
    const productsData = [];
    
    // جمع بيانات المنتجات
    productItems.forEach((item, index) => {
        const colorName = item.querySelector('.product-color-option.active').getAttribute('data-color');
        const size = item.querySelector('.size-btn.active').textContent;
        const quantity = item.querySelector('.quantity-value').textContent;
        
        productsData.push({
            product_number: index + 1,
            color: colorName,
            size: size,
            quantity: quantity
        });
    });
    
    // جمع بيانات العميل
    const customerData = {
        name: document.getElementById('customerName').value,
        mobile: document.getElementById('customerMobile').value,
        governorate: document.getElementById('customerGovernorate').value,
        address: document.getElementById('customerAddress').value,
        notes: document.getElementById('orderNotes').value || 'لا توجد ملاحظات',
        total_price: document.getElementById('finalPrice').textContent,
        order_date: new Date().toISOString(),
        products: JSON.stringify(productsData)
    };
    
    return customerData;
}

// إعادة تعيين النموذج بعد الإرسال
function resetOrderForm() {
    // إزالة جميع المنتجات
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.remove();
    });
    
    // إعادة تعيين عداد المنتجات
    productCounter = 0;
    
    // إعادة تعيين ملخص الطلب
    updateOrderSummary();
    
    // إعادة تعيين حقول النموذج
    document.getElementById('customerName').value = '';
    document.getElementById('customerMobile').value = '';
    document.getElementById('customerGovernorate').value = '';
    document.getElementById('customerAddress').value = '';
    document.getElementById('orderNotes').value = '';
}

// تطبيق خصم على المنتجات عند إضافة منتج جديد
function applyDiscount() {
    const products = document.querySelectorAll('.product-item');
    
    // التحقق من وجود أكثر من منتج واحد
    if (products.length > 1) {
        // تحديث نص الخصم في ملخص الطلب
        document.getElementById('discountText').textContent = 'خصم 10٪';
        
        // تحديث قيمة الخصم وتطبيقه على السعر النهائي
        updateOrderSummary();
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

// Initialize Enhanced Testimonials Section
function initEnhancedTestimonials() {
    console.log('تهيئة قسم التقييمات المحسنة...');
    
    // تهيئة قسم التقييمات المصرية
    // Define initEgyptianReviews function inline
    function initEgyptianReviews() {
        console.log('تهيئة قسم التقييمات المصرية...');
        
        const reviewsGallery = document.querySelector('.reviews-gallery');
        const seeMoreButton = document.querySelector('.see-more-button');
        
        if (!reviewsGallery || !seeMoreButton) {
            console.warn('لم يتم العثور على عناصر التقييمات المصرية');
            return;
        }
        
        const reviewItems = reviewsGallery.querySelectorAll('.review-gallery-item');
        
        if (reviewItems.length === 0) {
            console.warn('لم يتم العثور على عناصر التقييمات');
            return;
        }
        
        // عرض 6 تقييمات فقط في البداية
        let visibleCount = 6;
        reviewItems.forEach((item, index) => {
            if (index >= visibleCount) {
                item.style.display = 'none';
            }
        });
        
        // إضافة مستمع لزر عرض المزيد
        seeMoreButton.addEventListener('click', () => {
            if (visibleCount >= reviewItems.length) {
                // إذا كانت جميع التقييمات ظاهرة، أخفِ التقييمات الإضافية
                visibleCount = 6;
                seeMoreButton.innerHTML = 'عرض المزيد من التقييمات <i class="fas fa-chevron-down"></i>';
                seeMoreButton.classList.remove('expanded');
                
                // تمرير إلى قسم التقييمات
                document.querySelector('.reviews-gallery-section').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // عرض جميع التقييمات
                visibleCount = reviewItems.length;
                seeMoreButton.innerHTML = 'عرض أقل <i class="fas fa-chevron-up"></i>';
                seeMoreButton.classList.add('expanded');
            }
            
            // تحديث الرؤية
            reviewItems.forEach((item, index) => {
                if (index < visibleCount) {
                    item.style.display = '';
                    
                    // إضافة تأثير حركي للعناصر الجديدة المرئية
                    if (index >= 6) {
                        item.style.animation = 'fadeInUp 0.5s forwards';
                        item.style.animationDelay = `${(index - 6) * 0.1}s`;
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        });
        
        // إضافة تأثير التحويم للتقييمات
        reviewItems.forEach(item => {
            const overlay = item.querySelector('.review-gallery-overlay');
            const reviewText = item.querySelector('.review-text');
            
            // تخزين النص الأصلي لعرض النسخة الكاملة عند التحويم
            if (reviewText) {
                const originalText = reviewText.textContent;
                const truncatedText = truncateText(originalText, 100);
                
                // تعيين النص المختصر في البداية إذا لزم الأمر
                if (window.innerWidth < 768 && originalText.length > 100) {
                    reviewText.textContent = truncatedText;
                    
                    // عرض النص الكامل عند التحويم
                    item.addEventListener('mouseenter', () => {
                        reviewText.textContent = originalText;
                    });
                    
                    // استعادة النص المختصر عند مغادرة الماوس
                    item.addEventListener('mouseleave', () => {
                        reviewText.textContent = truncatedText;
                    });
                }
            }
        });
        
        // دالة مساعدة لاختصار النص
        function truncateText(text, maxLength) {
            if (text.length <= maxLength) return text;
            return text.substring(0, maxLength) + '...';
        }
    }
    
    // Call the inline function
    initEgyptianReviews();
    
    // تهيئة معرض الصور للتقييمات
    initReviewsGalleryLightbox();
}

// Initialize Reviews Gallery functionality
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
    
    // إضافة تأثير النقر على التقييمات
    addHoverEffectForReviews(reviewItems);
}

// Add hover effect for reviews
function addHoverEffectForReviews(reviewItems) {
    if (!reviewItems || reviewItems.length === 0) {
        reviewItems = document.querySelectorAll('.review-gallery-item');
    }
    
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
} 